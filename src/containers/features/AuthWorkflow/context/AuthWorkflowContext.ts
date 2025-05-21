import { createContext } from "react";
import type { AuthWorkflowContextValue } from "../types";

const initialValue: AuthWorkflowContextValue = {
  multiFactorHint: null,
  multiFactorResolver: null,
  multiFactorVerificationId: null,

  onSuccess: () => null,
  setMultiFactorHint: () => null,
  setMultiFactorResolver: () => null,
  setMultiFactorVerificationId: () => null,
};

export default createContext<AuthWorkflowContextValue>(initialValue);
