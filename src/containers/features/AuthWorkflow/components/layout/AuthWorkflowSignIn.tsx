import { useMutation } from "@tanstack/react-query";
import {
  getMultiFactorResolver,
  type MultiFactorError,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSnackbar } from "notistack";

import { auth } from "@/config/firebase";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import SignInForm from "@/containers/forms/SignInForm";
import { getErrorMessage, isMfaError } from "@/utils/error";

const AuthWorkflowSignIn = () => {
  /** Values */

  const { setMultiFactorResolver, onSuccess } = useAuthWorkflow();
  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const signInMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: { email: string; password: string }) => {
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

  return <SignInForm onSubmit={signInMutation.mutateAsync} />;
};

export default AuthWorkflowSignIn;
