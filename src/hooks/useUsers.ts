import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type UserRecord, type ListUsersResult } from "firebase-admin/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/store/config/firebase";
import type { Permissions } from "@/store/types/auth";

const QUERY_KEY = ["users"] as const;

const useUsers = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /** Queries */

  const detail = (id: string) =>
    queryOptions({
      queryKey: [...QUERY_KEY, "detail", id] as const,
      queryFn: async () => {
        const res = await httpsCallable<{ id: string }, UserRecord>(
          functions,
          "users-getUser"
        )({ id });
        return res.data;
      },
    });

  const list = (params?: { maxResults?: number; pageToken?: string }) =>
    queryOptions({
      queryKey: [...QUERY_KEY, "list", params] as const,
      queryFn: async () => {
        const res = await httpsCallable<
          { maxResults?: number; pageToken?: string },
          ListUsersResult
        >(
          functions,
          "users-getUserList"
        )(params);
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
    mutationFn: async (data: { id: string; permissions: Permissions }) => {
      const res = await httpsCallable<
        { id: string; permissions: Permissions },
        { message: string; permissions: Permissions }
      >(
        functions,
        "users-updatePermissions"
      )(data);

      return res.data;
    },
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: "error" }),
  });

  return {
    queries: { detail, list, permissions },
    mutations: { updatePermissions },
  };
};

export default useUsers;
