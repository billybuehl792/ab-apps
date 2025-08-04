import { type ComponentProps } from "react";
import { useMutation } from "@tanstack/react-query";
import { type PhoneMultiFactorInfo } from "firebase/auth";
import { Box, Stack, Typography, type StackProps } from "@mui/material";
import { useSnackbar } from "notistack";
import { authMutations } from "@/store/mutations/auth";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import VerificationCodeForm from "@/containers/forms/VerificationCodeForm";
import { markdownUtils } from "@/store/utils/markdown";

const AuthWorkflowMultiFactorPhoneVerification = (props: StackProps) => {
  /** Values */

  const {
    multiFactorHint,
    multiFactorResolver,
    multiFactorVerificationId,
    onSuccess,
  } = useAuthWorkflow();

  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const verifyPhoneCodeMutation = useMutation({
    ...authMutations.verifyPhoneCode(),
    onSuccess,
    onError: (error) =>
      enqueueSnackbar(
        `Error verifying phone code: ${markdownUtils.bold(error.message)}`,
        { variant: "error" }
      ),
  });

  /** Callbacks */

  const handleVerifyPhoneCode: ComponentProps<
    typeof VerificationCodeForm
  >["onSubmit"] = async (data) => {
    if (!multiFactorResolver) throw new Error("No multi-factor resolver");
    if (!multiFactorVerificationId)
      throw new Error("No multi-factor verification ID");

    return await verifyPhoneCodeMutation.mutateAsync({
      code: data.code,
      multiFactorResolver,
      multiFactorVerificationId,
    });
  };

  return (
    <Stack spacing={2} {...props}>
      <Typography variant="body2">
        Please enter the verification code sent to
        <Box component="span" fontWeight={600} mx={1}>
          {(multiFactorHint as PhoneMultiFactorInfo).phoneNumber}
        </Box>
      </Typography>
      <VerificationCodeForm onSubmit={handleVerifyPhoneCode} />
    </Stack>
  );
};

export default AuthWorkflowMultiFactorPhoneVerification;
