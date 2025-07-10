import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/store/config/firebase";
import { AuthMutationKeys, AuthQueryKeys } from "@/store/constants/auth";
import { markdownUtils } from "@/store/utils/markdown";
import type { Company } from "@/store/types/companies";
import type { Permissions } from "@/store/types/auth";

const useUsers = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /** Queries */

  const company = (id: string) =>
    queryOptions({
      queryKey: [...AuthQueryKeys.company, id] as const,
      queryFn: async () => {
        const res = await httpsCallable<{ id: string }, Company>(
          functions,
          "auth-getUserCompany"
        )({ id });

        return res.data;
      },
    });

  const permissions = (id: string) =>
    queryOptions({
      queryKey: [...AuthQueryKeys.permissions, id] as const,
      queryFn: async () => {
        const res = await httpsCallable<{ id: string }, Permissions>(
          functions,
          "auth-getUserPermissions"
        )({ id });

        return res.data;
      },
    });

  /** Mutations */

  const updatePermissions = useMutation({
    mutationKey: AuthMutationKeys.updatePermissions,
    mutationFn: async (data: { user: User; permissions: Permissions }) => {
      const res = await httpsCallable<
        { id: string; permissions: Permissions },
        { message: string; permissions: Permissions }
      >(
        functions,
        "auth-updateUserPermissions"
      )({ id: data.user.uid, permissions: data.permissions });

      return res.data;
    },
    onSuccess: (_, data) => {
      void queryClient.invalidateQueries(permissions(data.user.uid));
      enqueueSnackbar(
        `${markdownUtils.bold(data.user.displayName) || "User"} permissions updated to ${markdownUtils.bold(data.permissions.role)}`,
        { variant: "success" }
      );
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: "error" }),
  });

  return {
    queries: { company, permissions },
    mutations: { updatePermissions },
  };
};

export default useUsers;
