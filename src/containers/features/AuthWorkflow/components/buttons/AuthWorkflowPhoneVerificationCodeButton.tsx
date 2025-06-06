import { useId } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  type PhoneMultiFactorInfo,
} from "firebase/auth";
import { Box, Button, type ButtonProps } from "@mui/material";
import { Message } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import { auth } from "@/config/firebase";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";

interface AuthWorkflowPhoneVerificationCodeButtonProps extends ButtonProps {
  multiFactorHint: PhoneMultiFactorInfo;
}

const AuthWorkflowPhoneVerificationCodeButton = ({
  multiFactorHint,
  ...props
}: AuthWorkflowPhoneVerificationCodeButtonProps) => {
  /** Values */

  const containerId = useId();
  const phoneAuthProvider = new PhoneAuthProvider(auth);
  const {
    multiFactorResolver,
    setMultiFactorVerificationId,
    setMultiFactorHint,
  } = useAuthWorkflow();
  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const sendPhoneVerificationCodeMutation = useMutation({
    mutationKey: ["sendPhoneVerificationCode"],
    mutationFn: async () => {
      if (!multiFactorResolver) throw new Error("No multi-factor resolver");
      const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
      });
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

  /** Callbacks */

  const handleSendPhoneVerificationCode = () => {
    sendPhoneVerificationCodeMutation.mutate();
  };

  return (
    <Box component="span" id={containerId}>
      <Button
        startIcon={<Message />}
        fullWidth
        loading={sendPhoneVerificationCodeMutation.isPending}
        disabled={sendPhoneVerificationCodeMutation.isSuccess}
        onClick={handleSendPhoneVerificationCode}
        {...props}
      >
        Send verification code to {multiFactorHint.phoneNumber}
      </Button>
    </Box>
  );
};

export default AuthWorkflowPhoneVerificationCodeButton;
