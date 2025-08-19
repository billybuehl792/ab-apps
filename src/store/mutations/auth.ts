import { mutationOptions } from "@tanstack/react-query";
import {
  signOut as _signOut,
  type MultiFactorInfo,
  MultiFactorResolver,
  type MultiFactorSession,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { auth } from "@/store/config/firebase";

const signIn = () =>
  mutationOptions({
    mutationKey: ["auth", "signIn"] as const,
    mutationFn: (data: { email: string; password: string }) =>
      signInWithEmailAndPassword(auth, data.email, data.password),
  });

const signOut = () =>
  mutationOptions({
    mutationKey: ["auth", "signOut"] as const,
    mutationFn: () => _signOut(auth),
  });

const reloadUser = () =>
  mutationOptions({
    mutationKey: ["auth", "reloadUser"] as const,
    mutationFn: (user: User) => user.reload(),
  });

const sendPhoneVerificationCode = () =>
  mutationOptions({
    mutationKey: ["auth", "sendPhoneVerificationCode"] as const,
    mutationFn: (data: {
      phoneAuthProvider: PhoneAuthProvider;
      multiFactorHint: MultiFactorInfo;
      session: MultiFactorSession;
      verifier: RecaptchaVerifier;
    }) =>
      data.phoneAuthProvider.verifyPhoneNumber(
        {
          multiFactorHint: data.multiFactorHint,
          session: data.session,
        },
        data.verifier
      ),
  });

const sendEmailVerificationCode = () =>
  mutationOptions({
    mutationKey: ["auth", "sendEmailVerificationCode"] as const,
    mutationFn: (user: User) => sendEmailVerification(user),
  });

const verifyPhoneCode = () =>
  mutationOptions({
    mutationKey: ["auth", "verifyPhoneCode"] as const,
    mutationFn: (data: {
      code: string;
      multiFactorResolver: MultiFactorResolver;
      multiFactorVerificationId: string;
    }) =>
      data.multiFactorResolver.resolveSignIn(
        PhoneMultiFactorGenerator.assertion(
          PhoneAuthProvider.credential(
            data.multiFactorVerificationId,
            data.code
          )
        )
      ),
  });

export const authMutations = {
  signIn,
  signOut,
  reloadUser,
  sendEmailVerificationCode,
  sendPhoneVerificationCode,
  verifyPhoneCode,
};
