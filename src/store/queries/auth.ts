import { queryOptions } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import type { Company } from "../types/companies";
import type { Permissions } from "@/store/types/auth";

const QUERY_KEY = ["auth"] as const;

const company = () =>
  queryOptions({
    queryKey: [...QUERY_KEY, "company"] as const,
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
    queryKey: [...QUERY_KEY, "permissions"] as const,
    queryFn: async () => {
      const res = await httpsCallable<unknown, Permissions>(
        functions,
        "auth-getPermissions"
      )();

      return res.data;
    },
  });

export const authQueries = {
  company,
  permissions,
};
