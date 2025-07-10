import { useState } from "react";
import { Stack, type StackProps } from "@mui/material";
import { useSnackbar } from "notistack";
import AuthWorkflowProvider from "./providers/AuthWorkflowProvider";
import AuthWorkflowBreadcrumbs from "./components/layout/AuthWorkflowBreadcrumbs";
import AuthWorkflowBody from "./components/layout/AuthWorkflowBody";
import { markdownUtils } from "@/store/utils/markdown";
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
    enqueueSnackbar(
      `${markdownUtils.bold(value.user.displayName ?? value.user.email) || "User"} signed in`,
      { variant: "success" }
    );
    resetWorkflow();
    onSuccess?.(value);
  };

  const resetWorkflow = () => {
    setMultiFactorHint(null);
    setMultiFactorResolver(null);
    setMultiFactorVerificationId(null);
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
        <AuthWorkflowBreadcrumbs />
        <AuthWorkflowBody />
      </Stack>
    </AuthWorkflowProvider>
  );
};

export default AuthWorkflow;
