import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { userQueries } from "@/store/queries/users";
import { userMutations } from "@/store/mutations/users";
import useAuth from "./useAuth";

const useUsers = () => {
  /** Values */

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const auth = useAuth();

  /** Mutations */

  const update = useMutation({
    ...userMutations.update(),
    onSuccess: (res) => {
      void queryClient.invalidateQueries(userQueries());
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: (error) =>
      snackbar.enqueueSnackbar(error.message, { variant: "error" }),
  });

  const updateUserProfile = useMutation({
    ...userMutations.updateUserProfile(),
    onSuccess: (_, params) => {
      auth.reloadUser.mutate(params.user);
      snackbar.enqueueSnackbar("User profile updated", { variant: "success" });
    },
    onError: (error) =>
      snackbar.enqueueSnackbar(error.message, { variant: "error" }),
  });

  const updatePermissions = useMutation({
    ...userMutations.updatePermissions(),
    onSuccess: (res) => {
      void queryClient.invalidateQueries(userQueries());
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: (error) =>
      snackbar.enqueueSnackbar(error.message, { variant: "error" }),
  });

  return {
    queries: userQueries,
    mutations: { update, updateUserProfile, updatePermissions },
  };
};

export default useUsers;
