import { ComponentProps, useId, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import {
  ApplicationVerifier,
  MultiFactorError,
  MultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorInfo,
} from "firebase/auth";
import type { FirebaseError } from "firebase/app";

import useRecaptchaVerifier from "@/hooks/auth/useRecaptchaVerifier";
import useAuth from "@/hooks/auth/useAuth";
import SignInForm from "@/containers/forms/SignInForm";
import VerificationCodeForm from "@/containers/forms/VerificationCodeForm";
import { isMultiFactorError } from "@/utils/error";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.user) redirect({ to: "/", throw: true });
  },
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
});

function RouteComponent() {
  const [multiFactorData, setMultiFactorData] = useState<{
    resolver: MultiFactorResolver;
    verificationId: string;
    multiFactorHint: PhoneMultiFactorInfo;
  } | null>(null);

  /** Values */

  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  const signInId = useId();
  const recaptchaVerifier = useRecaptchaVerifier(signInId);
  const { signIn, sendMultiFactorVerification, verifyMultiFactorPhoneCode } =
    useAuth();

  /** Callbacks */

  const onSignIn: ComponentProps<typeof SignInForm>["onSubmit"] = async (
    formData
  ) => {
    try {
      return await signIn?.mutateAsync(formData);
    } catch (error) {
      if (isMultiFactorError(error) && recaptchaVerifier)
        await onMultiFactorError(recaptchaVerifier, error as MultiFactorError);
      else throw error;
    }
  };

  const onMultiFactorError = async (
    recaptchaVerifier: ApplicationVerifier,
    error: FirebaseError
  ) => {
    await sendMultiFactorVerification?.mutateAsync(
      {
        verifier: recaptchaVerifier,
        error: error as MultiFactorError,
      },
      {
        onSuccess: (data) => {
          setMultiFactorData(data);
        },
      }
    );
  };

  const onVerifyMultiFactorPhoneCode: ComponentProps<
    typeof VerificationCodeForm
  >["onSubmit"] = async (formData) => {
    if (!multiFactorData) return;

    return await verifyMultiFactorPhoneCode?.mutateAsync({
      resolver: multiFactorData.resolver,
      credential: PhoneAuthProvider.credential(
        multiFactorData.verificationId,
        formData.code
      ),
    });
  };

  const onSuccess = () => void navigate({ to: redirect || "/", replace: true });

  return (
    <Stack spacing={2} p={2}>
      <Typography variant="h6">Sign In</Typography>
      {multiFactorData ? (
        <Stack spacing={2}>
          <Typography variant="body1">
            Code sent to {multiFactorData.multiFactorHint.phoneNumber}
          </Typography>
          <VerificationCodeForm
            onSubmit={onVerifyMultiFactorPhoneCode}
            onSuccess={onSuccess}
          />
        </Stack>
      ) : (
        <SignInForm
          disableReset
          submitLabel="Sign In"
          onSubmit={onSignIn}
          onSuccess={onSuccess}
          slotProps={{
            actions: {
              slotProps: {
                submitButton: { id: signInId },
              },
            },
          }}
        />
      )}
    </Stack>
  );
}
