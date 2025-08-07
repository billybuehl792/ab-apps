import { queryOptions } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "../config/firebase";
import { QUERY_KEY } from "../constants/queries";
import type { Company } from "../types/companies";
import type { Permissions } from "@/store/types/auth";

const customClaims = () =>
  queryOptions({
    queryKey: [...QUERY_KEY.auth, "customClaims"],
    retry: false,
    queryFn: () => auth.currentUser?.getIdTokenResult(),
  });

const company = () =>
  queryOptions({
    queryKey: [...QUERY_KEY.auth, "company"] as const,
    retry: false,
    queryFn: async () => {
      const res = await httpsCallable<unknown, Company>(
        functions,
        "auth-getCompany"
      )();

      return res.data;
    },
  });

const permissions = () =>
  queryOptions({
    queryKey: [...QUERY_KEY.auth, "permissions"] as const,
    retry: false,
    queryFn: async () => {
      const res = await httpsCallable<unknown, Permissions>(
        functions,
        "auth-getPermissions"
      )();

      return res.data;
    },
  });

export const authQueries = {
  customClaims,
  company,
  permissions,
};
