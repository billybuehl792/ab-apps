import { useId, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import SignInForm from "@/containers/forms/SignInForm";
import useRecaptcha from "@/hooks/useRecaptcha";
import {
  MultiFactorError,
  MultiFactorResolver,
  PhoneAuthProvider,
} from "firebase/auth";
import { FirebaseErrorCode } from "@/firebase/enums";
import type { FirebaseError } from "firebase/app";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth.user) throw redirect({ to: "/" });
  },
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
});

function RouteComponent() {
  const [verificationId, setVerificationId] = useState("");
  const [verificationString, setVerificationString] = useState("");
  const [resolver, setResolver] = useState<MultiFactorResolver | null>(null);

  /** Values */

  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  const signInId = useId();
  const recaptchaVerifier = useRecaptcha(signInId);
  const { signIn, sendMultiFactorVerification, verifyMultiFactorPhoneCode } =
    useAuth();

  /** Callbacks */

  const onError = async (error: FirebaseError) => {
    if (
      error.code === FirebaseErrorCode.MULTI_FACTOR_AUTH_REQUIRED &&
      recaptchaVerifier
    )
      await sendMultiFactorVerification?.mutateAsync(
        {
          verifier: recaptchaVerifier,
          error: error as MultiFactorError,
        },
        {
          onSuccess: ({ resolver, verificationId }) => {
            setResolver(resolver);
            setVerificationId(verificationId);
          },
        }
      );
  };

  const handleVerify = () => {
    if (!resolver) return;
    verifyMultiFactorPhoneCode?.mutate(
      {
        resolver,
        credential: PhoneAuthProvider.credential(
          verificationId,
          verificationString
        ),
      },
      { onSuccess: () => navigate({ to: redirect || "/", replace: true }) }
    );
  };

  return (
    <Stack spacing={0.5} p={2}>
      <Typography variant="h6">Sign In</Typography>
      <SignInForm
        onSubmit={async (formData) => {
          await signIn?.mutateAsync(formData, {
            onSuccess: () => navigate({ to: redirect || "/", replace: true }),
            onError: (error) => onError(error as FirebaseError),
          });
        }}
        slotProps={{ signInButton: { id: signInId } }}
      />

      <Stack spacing={1}>
        <TextField
          placeholder="verify"
          value={verificationString}
          onChange={(event) => setVerificationString(event.target.value)}
        />
        <Button onClick={handleVerify}>Verify</Button>
      </Stack>
    </Stack>
  );
}
