import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Stack, type StackProps } from "@mui/material";
import { useSnackbar } from "notistack";
import AuthWorkflowProvider from "./providers/AuthWorkflowProvider";
import AuthWorkflowBreadcrumbs from "./components/layout/AuthWorkflowBreadcrumbs";
import AuthWorkflowBody from "./components/layout/AuthWorkflowBody";
import { markdownUtils } from "@/store/utils/markdown";
import type { AuthWorkflowContextValue } from "./types";

const AuthWorkflow = (props: StackProps) => {
  const [multiFactorHint, setMultiFactorHint] =
    useState<AuthWorkflowContextValue["multiFactorHint"]>(null);
  const [multiFactorResolver, setMultiFactorResolver] =
    useState<AuthWorkflowContextValue["multiFactorResolver"]>(null);
  const [multiFactorVerificationId, setMultiFactorVerificationId] =
    useState<AuthWorkflowContextValue["multiFactorVerificationId"]>(null);

  /** Values */

  const router = useRouter();
  const snackbar = useSnackbar();

  /** Callbacks */

  const onSuccess: AuthWorkflowContextValue["onSuccess"] = (value) => {
    snackbar.enqueueSnackbar(
      `${markdownUtils.bold(value.user.displayName ?? value.user.email) || "User"} signed in`,
      { variant: "success" }
    );
    setTimeout(() => void router.invalidate(), 200);
  };

  return (
    <AuthWorkflowProvider
      value={{
        multiFactorHint,
        multiFactorResolver,
        multiFactorVerificationId,
        onSuccess,
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
