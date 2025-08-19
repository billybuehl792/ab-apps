import { createContext } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import type { Profile } from "@/store/types/auth";

export default createContext<{
  user: User | null;
  profile: Profile;
  loading: boolean;
  signOut: UseMutationResult<void, Error, void>;
  reloadUser: UseMutationResult<void, Error, User>;
}>({
  user: null,
  loading: false,
  profile: { company: null, permissions: null },
  signOut: {} as UseMutationResult<void, Error, void>,
  reloadUser: {} as UseMutationResult<void, Error, User>,
});
