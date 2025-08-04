import { useId, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  type PhoneMultiFactorInfo,
} from "firebase/auth";
import { Box, Button, Stack, type ButtonProps } from "@mui/material";
import { Message } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { auth } from "@/store/config/firebase";
import { authMutations } from "@/store/mutations/auth";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";

interface AuthWorkflowPhoneVerificationCodeButtonProps extends ButtonProps {
  multiFactorHint: PhoneMultiFactorInfo;
}

const AuthWorkflowPhoneVerificationCodeButton = ({
  multiFactorHint,
  ...props
}: AuthWorkflowPhoneVerificationCodeButtonProps) => {
  const [recaptchaPending, setRecaptchaPending] = useState(false);

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
    ...authMutations.sendPhoneVerificationCode(),
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

  const handleSendPhoneVerificationCode = async () => {
    if (!multiFactorResolver) return;
    setRecaptchaPending(true);
    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      callback: () => {
        sendPhoneVerificationCodeMutation.mutate({
          phoneAuthProvider,
          multiFactorHint,
          session: multiFactorResolver.session,
          verifier: recaptchaVerifier,
        });
        setRecaptchaPending(false);
      },
      "expired-callback": () => {
        enqueueSnackbar("ReCAPTCHA expired, please try again", {
          variant: "warning",
        });
        setRecaptchaPending(false);
      },
    });
    await recaptchaVerifier.render();
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Button
        startIcon={<Message />}
        fullWidth
        loading={
          sendPhoneVerificationCodeMutation.isPending || recaptchaPending
        }
        disabled={sendPhoneVerificationCodeMutation.isSuccess}
        onClick={() => void handleSendPhoneVerificationCode()}
        {...props}
      >
        Send verification code to {multiFactorHint.phoneNumber}
      </Button>
      <Box id={containerId} />
    </Stack>
  );
};

export default AuthWorkflowPhoneVerificationCodeButton;
