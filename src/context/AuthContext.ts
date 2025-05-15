import { createContext } from "react";
import { type UseMutationResult } from "@tanstack/react-query";
import type {
  ApplicationVerifier,
  MultiFactorError,
  MultiFactorResolver,
  PhoneAuthCredential,
  PhoneMultiFactorInfo,
  User,
  UserCredential,
} from "firebase/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn?: UseMutationResult<
    UserCredential,
    Error,
    { email: string; password: string }
  >;
  signOut?: UseMutationResult<void, Error, void>;
  sendEmailVerification?: UseMutationResult<void, Error, void>;
  sendMultiFactorVerification?: UseMutationResult<
    {
      resolver: MultiFactorResolver;
      verificationId: string;
      multiFactorHint: PhoneMultiFactorInfo;
    },
    Error,
    {
      verifier: ApplicationVerifier;
      error: MultiFactorError;
    }
  >;
  verifyMultiFactorPhoneCode?: UseMutationResult<
    UserCredential,
    Error,
    {
      resolver: MultiFactorResolver;
      credential: PhoneAuthCredential;
    }
  >;
}

export default createContext<AuthContextValue>({
  user: null,
  loading: true,
});
