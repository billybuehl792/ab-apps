import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { userQueries } from "@/store/queries/users";
import { userMutations } from "@/store/mutations/users";
import { QUERY_KEY } from "@/store/constants/queries";

const useUsers = () => {
  /** Values */

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  /** Mutations */

  const update = useMutation({
    ...userMutations.update(),
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.users });
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: (error) =>
      snackbar.enqueueSnackbar(error.message, { variant: "error" }),
  });

  const updatePermissions = useMutation({
    ...userMutations.updatePermissions(),
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.users });
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: (error) =>
      snackbar.enqueueSnackbar(error.message, { variant: "error" }),
  });

  return {
    queries: { ...userQueries },
    mutations: { update, updatePermissions },
  };
};

export default useUsers;
