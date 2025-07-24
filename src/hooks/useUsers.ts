import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { userQueries } from "@/store/queries/users";
import { userMutations } from "@/store/mutations/users";

const useUsers = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const updatePermissions = useMutation({
    ...userMutations.updatePermissions(),
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: "error" }),
  });

  return {
    queries: { ...userQueries },
    mutations: { updatePermissions },
  };
};

export default useUsers;
