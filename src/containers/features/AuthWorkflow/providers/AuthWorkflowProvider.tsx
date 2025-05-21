import { type PropsWithChildren } from "react";
import type { AuthWorkflowContextValue } from "../types";
import AuthWorkflowContext from "../context/AuthWorkflowContext";

const AuthWorkflowProvider = ({
  children,
  value,
}: PropsWithChildren & { value: AuthWorkflowContextValue }) => {
  return <AuthWorkflowContext value={value}>{children}</AuthWorkflowContext>;
};

export default AuthWorkflowProvider;
