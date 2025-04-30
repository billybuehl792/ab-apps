import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  signInWithEmailAndPassword,
  signOut as _signOut,
  sendEmailVerification as _sendEmailVerification,
  type User,
  getMultiFactorResolver,
  PhoneMultiFactorGenerator,
  type MultiFactorError,
  type ApplicationVerifier,
  PhoneAuthProvider,
  type PhoneMultiFactorInfo,
  MultiFactorResolver,
  type PhoneAuthCredential,
} from "firebase/auth";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

import AuthContext from "@/context/AuthContext";
import { auth } from "@/config/firebase";
import { getErrorMessage, isMfaError } from "@/utils/error";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /** Values */

  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const signIn = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (credentials: { email: string; password: string }) =>
      signInWithEmailAndPassword(auth, credentials.email, credentials.password),
    onSuccess: ({ user }) =>
      enqueueSnackbar(`${user.displayName ?? user.email ?? "User"} signed in`, {
        variant: "success",
      }),
    onError: (error) =>
      enqueueSnackbar(getErrorMessage(error), {
        variant: isMfaError(error) ? "default" : "error",
      }),
  });

  const signOut = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => _signOut(auth),
    onSuccess: () => {
      enqueueSnackbar("Signed out", { variant: "success" });
    },
    onError: (error) =>
      enqueueSnackbar(getErrorMessage(error), {
        variant: "error",
      }),
  });

  const sendEmailVerification = useMutation({
    mutationKey: ["sendEmailVerification"],
    mutationFn: (user: User) => _sendEmailVerification(user),
    onSuccess: () =>
      enqueueSnackbar("Email verification link sent", { variant: "success" }),
    onError: (error) =>
      enqueueSnackbar(getErrorMessage(error), {
        variant: "error",
      }),
  });

  const sendMultiFactorVerification = useMutation({
    mutationKey: ["sendMultiFactorVerification"],
    mutationFn: async (data: {
      verifier: ApplicationVerifier;
      error: MultiFactorError;
    }) => {
      const resolver = getMultiFactorResolver(auth, data.error);
      const multiFactorHint = resolver.hints.find(
        (hint) => hint.factorId === PhoneMultiFactorGenerator.FACTOR_ID
      ) as PhoneMultiFactorInfo | undefined;
      if (!multiFactorHint) throw new Error("No phone number found");

      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        { multiFactorHint, session: resolver.session },
        data.verifier
      );

      return { resolver, verificationId, multiFactorHint };
    },
    onSuccess: ({ multiFactorHint }) =>
      enqueueSnackbar(
        `Verification message sent to ${multiFactorHint.phoneNumber}`,
        { variant: "success" }
      ),
    onError: (error) =>
      enqueueSnackbar(getErrorMessage(error), {
        variant: "error",
      }),
  });

  const verifyMultiFactorPhoneCode = useMutation({
    mutationKey: ["verifyMultiFactorPhoneCode"],
    mutationFn: async (data: {
      resolver: MultiFactorResolver;
      credential: PhoneAuthCredential;
    }) => {
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(
        data.credential
      );

      return await data.resolver.resolveSignIn(multiFactorAssertion);
    },
    onSuccess: ({ user }) =>
      enqueueSnackbar(`${user.displayName ?? user.email ?? "User"} signed in`, {
        variant: "success",
      }),
    onError: (error) =>
      enqueueSnackbar(getErrorMessage(error), {
        variant: "error",
      }),
  });

  /** Effects */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext
      value={useMemo(
        () => ({
          user,
          loading,
          signIn,
          signOut,
          sendEmailVerification,
          sendMultiFactorVerification,
          verifyMultiFactorPhoneCode,
        }),
        [
          user,
          loading,
          signIn,
          signOut,
          sendEmailVerification,
          sendMultiFactorVerification,
          verifyMultiFactorPhoneCode,
        ]
      )}
    >
      {loading ? <CircularProgress /> : children}
    </AuthContext>
  );
};

export default AuthProvider;
