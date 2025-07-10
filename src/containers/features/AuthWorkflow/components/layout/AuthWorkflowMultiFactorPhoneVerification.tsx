import { useMutation } from "@tanstack/react-query";
import {
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  type PhoneMultiFactorInfo,
} from "firebase/auth";
import { Box, Stack, Typography, type StackProps } from "@mui/material";
import { useSnackbar } from "notistack";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import VerificationCodeForm from "@/containers/forms/VerificationCodeForm";
import { markdownUtils } from "@/store/utils/markdown";
import { AuthMutationKeys } from "@/store/constants/auth";

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
    mutationKey: AuthMutationKeys.verifyPhoneCode,
    mutationFn: async (data: { code: string }) => {
      if (!multiFactorResolver) throw new Error("No multi-factor resolver");
      if (!multiFactorVerificationId)
        throw new Error("No multi-factor verification ID");

      return await multiFactorResolver.resolveSignIn(
        PhoneMultiFactorGenerator.assertion(
          PhoneAuthProvider.credential(multiFactorVerificationId, data.code)
        )
      );
    },
    onSuccess,
    onError: (error) =>
      enqueueSnackbar(
        `Error verifying phone code: ${markdownUtils.bold(error.message)}`,
        { variant: "error" }
      ),
  });

  return (
    <Stack spacing={2} {...props}>
      <Typography variant="body2">
        Please enter the verification code sent to
        <Box component="span" fontWeight={600} mx={1}>
          {(multiFactorHint as PhoneMultiFactorInfo).phoneNumber}
        </Box>
      </Typography>
      <VerificationCodeForm onSubmit={verifyPhoneCodeMutation.mutateAsync} />
    </Stack>
  );
};

export default AuthWorkflowMultiFactorPhoneVerification;
