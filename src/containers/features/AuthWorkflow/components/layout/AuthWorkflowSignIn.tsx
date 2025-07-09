import { useMutation } from "@tanstack/react-query";
import {
  getMultiFactorResolver,
  type MultiFactorError,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSnackbar } from "notistack";
import { auth } from "@/store/config/firebase";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import SignInForm from "@/containers/forms/SignInForm";
import { getErrorMessage, isMfaError } from "@/store/utils/error";
import { AuthMutationKeys } from "@/store/constants/auth";

const AuthWorkflowSignIn = () => {
  /** Values */

  const { setMultiFactorResolver, onSuccess } = useAuthWorkflow();
  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const signInMutation = useMutation({
    mutationKey: AuthMutationKeys.signIn,
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

  return (
    <SignInForm
      onSubmit={signInMutation.mutateAsync}
      slotProps={{
        actions: {
          slotProps: {
            submitButton: {
              disabled: signInMutation.isSuccess,
              loading: signInMutation.isPending,
            },
          },
        },
      }}
    />
  );
};

export default AuthWorkflowSignIn;
