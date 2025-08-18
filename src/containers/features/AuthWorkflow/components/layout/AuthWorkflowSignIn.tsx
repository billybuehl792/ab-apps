import { useMutation } from "@tanstack/react-query";
import { getMultiFactorResolver, type MultiFactorError } from "firebase/auth";
import { useSnackbar } from "notistack";
import { auth } from "@/store/config/firebase";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import SignInForm from "@/containers/forms/SignInForm";
import { getErrorMessage, isMfaError } from "@/store/utils/error";
import { authMutations } from "@/store/mutations/auth";

const AuthWorkflowSignIn = () => {
  /** Values */

  const { setMultiFactorResolver, onSuccess } = useAuthWorkflow();
  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const signInMutation = useMutation({
    ...authMutations.signIn(),
    onSuccess,
    onError: (error) => {
      if (isMfaError(error))
        setMultiFactorResolver(
          getMultiFactorResolver(auth, error as MultiFactorError)
        );
      else enqueueSnackbar(getErrorMessage(error), { variant: "error" });
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
