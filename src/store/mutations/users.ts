import { mutationOptions } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import type { Permissions } from "../types/auth";

const MUTATION_KEY = ["users"] as const;

const updatePermissions = () =>
  mutationOptions({
    mutationKey: [...MUTATION_KEY, "updatePermissions"] as const,
    mutationFn: async (body: { id: string; permissions: Permissions }) => {
      const res = await httpsCallable<
        { id: string; permissions: Permissions },
        { message: string; permissions: Permissions }
      >(
        functions,
        "users-updatePermissions"
      )(body);

      return res.data;
    },
  });

export const userMutations = {
  updatePermissions,
};
