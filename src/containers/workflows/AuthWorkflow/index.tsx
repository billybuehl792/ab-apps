import { type ComponentProps, useId, useState } from "react";
import {
  type MultiFactorError,
  MultiFactorResolver,
  PhoneAuthProvider,
  type PhoneMultiFactorInfo,
  type UserCredential,
} from "firebase/auth";
import { Breadcrumbs, Stack, Typography, type StackProps } from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import useRecaptchaVerifier from "@/hooks/auth/useRecaptchaVerifier";
import VerificationCodeForm from "@/containers/forms/VerificationCodeForm";
import SignInForm from "@/containers/forms/SignInForm";
import { isMfaError } from "@/utils/error";

interface AuthWorkflowProps extends StackProps {
  onSuccess?: (userCredential: UserCredential) => void;
}

const AuthWorkflow = ({ onSuccess, ...props }: AuthWorkflowProps) => {
  const [mfaData, setMfaData] = useState<{
    resolver: MultiFactorResolver;
    verificationId: string;
    multiFactorHint: PhoneMultiFactorInfo;
  } | null>(null);

  /** Values */

  const signInId = useId();
  const recaptchaVerifier = useRecaptchaVerifier(signInId);
  const {
    user,
    signIn,
    sendMultiFactorVerification,
    verifyMultiFactorPhoneCode,
  } = useAuth();

  /** Callbacks */

  const handleSignIn: ComponentProps<typeof SignInForm>["onSubmit"] = async (
    formData
  ) => {
    try {
      if (!signIn) throw new Error("SignIn function not available");
      return await signIn.mutateAsync(formData, {
        onSuccess: (userCredential) => {
          onSuccess?.(userCredential);
        },
      });
    } catch (error) {
      await handleMfaError(error);
      throw error;
    }
  };

  const handleMfaError = async (error: unknown) => {
    if (!isMfaError(error)) return;

    if (!recaptchaVerifier) throw new Error("RecaptchaVerifier not available");
    if (!sendMultiFactorVerification)
      throw new Error("SendMultiFactorVerification not available");

    await sendMultiFactorVerification.mutateAsync(
      {
        verifier: recaptchaVerifier,
        error: error as MultiFactorError,
      },
      {
        onSuccess: (data) => {
          setMfaData(data);
        },
      }
    );
  };

  const handleVerifyMfaPhoneCode: ComponentProps<
    typeof VerificationCodeForm
  >["onSubmit"] = async (data) => {
    if (!mfaData) throw new Error("MultiFactorData not available");
    if (!verifyMultiFactorPhoneCode)
      throw new Error("VerifyMultiFactorPhoneCode not available");

    return await verifyMultiFactorPhoneCode.mutateAsync(
      {
        resolver: mfaData.resolver,
        credential: PhoneAuthProvider.credential(
          mfaData.verificationId,
          data.code
        ),
      },
      {
        onSuccess: (userCredential) => {
          onSuccess?.(userCredential);
        },
      }
    );
  };

  if (user)
    return <Typography variant="h6">Welcome {user.displayName}!</Typography>;
  return (
    <Stack spacing={2} {...props}>
      <Breadcrumbs>
        <Typography variant="h6" color="textPrimary">
          Sign In
        </Typography>
        {Boolean(mfaData) && (
          <Typography variant="h6">Multi-Factor Authentication</Typography>
        )}
      </Breadcrumbs>

      {mfaData ? (
        <>
          <Stack spacing={1}>
            <Typography variant="body2">
              For your security, we need to confirm it's really you. A 6-digit
              verification code has been sent to your registered device. Please
              enter the code below to continue.
            </Typography>
            <Typography variant="body2">
              Code sent to {mfaData.multiFactorHint.phoneNumber}
            </Typography>
          </Stack>
          <VerificationCodeForm onSubmit={handleVerifyMfaPhoneCode} />
        </>
      ) : (
        <SignInForm
          slotProps={{
            actions: {
              slotProps: {
                submitButton: { id: signInId },
              },
            },
          }}
          onSubmit={handleSignIn}
        />
      )}
    </Stack>
  );
};

export default AuthWorkflow;
