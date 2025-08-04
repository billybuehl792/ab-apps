import { createContext } from "react";
import { type User } from "firebase/auth";
import { DEFAULT_COMPANY, DEFAULT_PERMISSIONS } from "@/store/constants/auth";
import type { Permissions } from "@/store/types/auth";
import type { Company } from "@/store/types/companies";
import { UseMutationResult } from "@tanstack/react-query";

export default createContext<{
  user: User | null;
  company: Company;
  permissions: Permissions;
  loading: boolean;
  signOut: UseMutationResult<void, Error, void>;
}>({
  user: null,
  loading: false,
  company: DEFAULT_COMPANY,
  permissions: DEFAULT_PERMISSIONS,
  signOut: {} as UseMutationResult<void, Error, void>,
});
