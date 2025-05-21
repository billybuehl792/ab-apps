import { Stack, type StackProps, Typography } from "@mui/material";
import AuthWorkflowPhoneVerificationCodeButton from "../buttons/AuthWorkflowPhoneVerificationCodeButton";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import { FactorId, PhoneMultiFactorInfo } from "firebase/auth";

const AuthWorkflowMultiFactorHints = (props: StackProps) => {
  /** Values */

  const { multiFactorResolver } = useAuthWorkflow();

  return (
    <Stack spacing={2} {...props}>
      <Typography variant="body2">
        Multi-factor authentication is enabled on your account. Please select
        the method you would like to use to verify your identity.
      </Typography>
      <Stack spacing={1}>
        {multiFactorResolver?.hints.map((hint) => {
          const isPhone = hint.factorId === FactorId.PHONE;
          if (isPhone)
            return (
              <AuthWorkflowPhoneVerificationCodeButton
                key={hint.uid}
                multiFactorHint={hint as PhoneMultiFactorInfo}
              />
            );
        })}
      </Stack>
    </Stack>
  );
};

export default AuthWorkflowMultiFactorHints;
