import { useId } from "react";
import { useMutation } from "@tanstack/react-query";
import { PhoneAuthProvider, type PhoneMultiFactorInfo } from "firebase/auth";
import { Button, type ButtonProps } from "@mui/material";
import { Message } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import { auth } from "@/config/firebase";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import useRecaptchaVerifier from "@/hooks/auth/useRecaptchaVerifier";

interface AuthWorkflowPhoneVerificationCodeButtonProps extends ButtonProps {
  multiFactorHint: PhoneMultiFactorInfo;
}

const AuthWorkflowPhoneVerificationCodeButton = ({
  multiFactorHint,
  ...props
}: AuthWorkflowPhoneVerificationCodeButtonProps) => {
  /** Values */

  const {
    multiFactorResolver,
    setMultiFactorVerificationId,
    setMultiFactorHint,
  } = useAuthWorkflow();

  const buttonId = useId();

  const { enqueueSnackbar } = useSnackbar();
  const recaptchaVerifier = useRecaptchaVerifier(buttonId);
  const phoneAuthProvider = new PhoneAuthProvider(auth);

  /** Mutations */

  const sendPhoneVerificationCodeMutation = useMutation({
    mutationKey: ["sendPhoneVerificationCode"],
    mutationFn: async () => {
      if (!multiFactorResolver) throw new Error("No multi-factor resolver");
      return await phoneAuthProvider.verifyPhoneNumber(
        {
          multiFactorHint,
          session: multiFactorResolver.session,
        },
        recaptchaVerifier
      );
    },
    onSuccess: (verificationId) => {
      setMultiFactorHint(multiFactorHint);
      setMultiFactorVerificationId(verificationId);
      enqueueSnackbar(
        `Verification code sent to ${multiFactorHint.phoneNumber}`,
        { variant: "success" }
      );
    },
    onError: () => {
      enqueueSnackbar("Error sending phone verification code", {
        variant: "error",
      });
    },
  });

  return (
    <Button
      id={buttonId}
      startIcon={<Message />}
      loading={sendPhoneVerificationCodeMutation.isPending}
      disabled={
        sendPhoneVerificationCodeMutation.isSuccess ||
        sendPhoneVerificationCodeMutation.isError
      }
      onClick={() => {
        sendPhoneVerificationCodeMutation.mutate();
      }}
      {...props}
    >
      Send verification code to {multiFactorHint.phoneNumber}
    </Button>
  );
};

export default AuthWorkflowPhoneVerificationCodeButton;
