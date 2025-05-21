import { useId } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  getMultiFactorResolver,
  type MultiFactorError,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSnackbar } from "notistack";

import { auth } from "@/config/firebase";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import useRecaptchaVerifier from "@/hooks/auth/useRecaptchaVerifier";
import SignInForm from "@/containers/forms/SignInForm";
import { getErrorMessage, isMfaError } from "@/utils/error";

const AuthWorkflowSignIn = () => {
  /** Values */

  const { setMultiFactorResolver, onSuccess } = useAuthWorkflow();
  const { enqueueSnackbar } = useSnackbar();

  const buttonId = useId();
  const recaptchaVerifier = useRecaptchaVerifier(buttonId);

  /** Mutations */

  const signInMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: { email: string; password: string }) => {
      await recaptchaVerifier?.verify();
      return await signInWithEmailAndPassword(auth, data.email, data.password);
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      if (isMfaError(error)) {
        const resolver = getMultiFactorResolver(
          auth,
          error as MultiFactorError
        );

        setMultiFactorResolver(resolver);
      } else enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    },
  });

  return (
    <SignInForm
      slotProps={{ actions: { slotProps: { submitButton: { id: buttonId } } } }}
      onSubmit={signInMutation.mutateAsync}
    />
  );
};

export default AuthWorkflowSignIn;
