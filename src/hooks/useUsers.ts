import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type User } from "firebase/auth";
import { type ListUsersResult } from "firebase-admin/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/store/config/firebase";
import { markdownUtils } from "@/store/utils/markdown";
import type { Permissions } from "@/store/types/auth";

const QUERY_KEY = ["users"] as const;

const useUsers = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /** Queries */

  const list = () =>
    queryOptions({
      queryKey: [...QUERY_KEY, "list"] as const,
      queryFn: async () => {
        const res = await httpsCallable<unknown, ListUsersResult>(
          functions,
          "users-getUserList"
        )();
        return res.data;
      },
    });

  const permissions = (id: string) =>
    queryOptions({
      queryKey: [...QUERY_KEY, "permissions", id] as const,
      queryFn: async () => {
        const res = await httpsCallable<{ id: string }, Permissions>(
          functions,
          "users-getUserPermissions"
        )({ id });
        return res.data;
      },
    });

  /** Mutations */

  const updatePermissions = useMutation({
    mutationKey: [...QUERY_KEY, "permissions", "update"],
    mutationFn: async (data: { user: User; permissions: Permissions }) => {
      const res = await httpsCallable<
        { id: string; permissions: Permissions },
        { message: string; permissions: Permissions }
      >(
        functions,
        "users-updatePermissions"
      )({ id: data.user.uid, permissions: data.permissions });

      return res.data;
    },
    onSuccess: (_, data) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      enqueueSnackbar(
        `${markdownUtils.bold(data.user.displayName) || "User"} permissions updated to ${markdownUtils.bold(data.permissions.role)}`,
        { variant: "success" }
      );
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: "error" }),
  });

  return {
    queries: { list, permissions },
    mutations: { updatePermissions },
  };
};

export default useUsers;
