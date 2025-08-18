import { createContext } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import type { Permissions } from "@/store/types/auth";
import type { Company } from "@/store/types/companies";

export default createContext<{
  user: User | null;
  profile: { company: Company | null; permissions: Permissions | null };
  loading: boolean;
  signOut: UseMutationResult<void, Error, void>;
}>({
  user: null,
  loading: false,
  profile: { company: null, permissions: null },
  signOut: {} as UseMutationResult<void, Error, void>,
});
