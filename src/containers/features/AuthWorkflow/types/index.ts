import {
  type UserCredential,
  type MultiFactorResolver,
  type MultiFactorInfo,
} from "firebase/auth";

export interface AuthWorkflowContextValue {
  multiFactorHint: MultiFactorInfo | null;
  multiFactorResolver: MultiFactorResolver | null;
  multiFactorVerificationId: string | null;

  onSuccess: (value: UserCredential) => void;
  setMultiFactorHint: (value: MultiFactorInfo | null) => void;
  setMultiFactorResolver: (value: MultiFactorResolver | null) => void;
  setMultiFactorVerificationId: (value: string | null) => void;
}
