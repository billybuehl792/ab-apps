import { queryOptions } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import type { ListUsersResult, UserRecord } from "firebase-admin/auth";
import type { Permissions } from "../types/auth";

const list = (params?: { maxResults?: number; pageToken?: string }) =>
  queryOptions({
    queryKey: [...userQueries().queryKey, "list", params] as const,
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

const detail = (id: string) =>
  queryOptions({
    queryKey: [...userQueries().queryKey, "detail", id] as const,
    queryFn: async () => {
      const res = await httpsCallable<{ id: string }, UserRecord>(
        functions,
        "users-getUser"
      )({ id });
      return res.data;
    },
  });

const permissions = (id: string) =>
  queryOptions({
    queryKey: [...userQueries().queryKey, "permissions", id] as const,
    queryFn: async () => {
      const res = await httpsCallable<{ id: string }, Permissions>(
        functions,
        "users-getUserPermissions"
      )({ id });
      return res.data;
    },
  });

export const userQueries = Object.assign(
  () => ({ queryKey: ["users"] as const }),
  { list, detail, permissions }
);
