import { useState } from "react";
import { Stack, type StackProps } from "@mui/material";
import { useSnackbar } from "notistack";

import AuthWorkflowProvider from "./providers/AuthWorkflowProvider";
import AuthWorkflowHeader from "./components/layout/AuthWorkflowHeader";
import AuthWorkflowBody from "./components/layout/AuthWorkflowBody";
import type { AuthWorkflowContextValue } from "./types";

interface AuthWorkflowProps extends StackProps {
  onSuccess?: AuthWorkflowContextValue["onSuccess"];
}

const AuthWorkflow = ({ onSuccess, ...props }: AuthWorkflowProps) => {
  const [multiFactorHint, setMultiFactorHint] =
    useState<AuthWorkflowContextValue["multiFactorHint"]>(null);
  const [multiFactorResolver, setMultiFactorResolver] =
    useState<AuthWorkflowContextValue["multiFactorResolver"]>(null);
  const [multiFactorVerificationId, setMultiFactorVerificationId] =
    useState<AuthWorkflowContextValue["multiFactorVerificationId"]>(null);

  /** Values */

  const { enqueueSnackbar } = useSnackbar();

  /** Callbacks */

  const handleSignInSuccess: AuthWorkflowContextValue["onSuccess"] = (
    value
  ) => {
    const userName = value.user.displayName ?? value.user.email ?? "User";
    enqueueSnackbar(`${userName} signed in`, { variant: "success" });

    onSuccess?.(value);
  };

  return (
    <AuthWorkflowProvider
      value={{
        multiFactorHint,
        multiFactorResolver,
        multiFactorVerificationId,
        onSuccess: handleSignInSuccess,
        setMultiFactorHint,
        setMultiFactorVerificationId,
        setMultiFactorResolver,
      }}
    >
      <Stack spacing={2} {...props}>
        <AuthWorkflowHeader />
        <AuthWorkflowBody />
      </Stack>
    </AuthWorkflowProvider>
  );
};

export default AuthWorkflow;
