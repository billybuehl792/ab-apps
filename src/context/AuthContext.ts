import { createContext } from "react";
import { type UseMutationResult } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import type { Permissions } from "@/store/types/auth";
import type { Company } from "@/store/types/companies";

export default createContext<{
  user: User | null;
  company?: Company;
  permissions?: Permissions;
  loading: boolean;
  mutations: { signOut: UseMutationResult<void, Error, void> };
}>({
  user: null,
  loading: true,
  mutations: { signOut: {} as UseMutationResult<void, Error, void> },
});
