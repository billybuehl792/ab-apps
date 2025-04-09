import { createContext, useContext } from "react";
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
  sendEmailVerification?: UseMutationResult<void, Error, User>;
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

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthContext, useAuth };
