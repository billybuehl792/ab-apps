import { mutationOptions } from "@tanstack/react-query";
import { type UserRecord, type UpdateRequest } from "firebase-admin/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import { MutationVariant } from "../enums/queries";
import type { Permissions } from "../types/auth";

const MUTATION_KEY = ["users"] as const;

const update = () =>
  mutationOptions({
    mutationKey: [...MUTATION_KEY, MutationVariant.UPDATE] as const,
    mutationFn: async (body: { id: string; body: UpdateRequest }) => {
      const res = await httpsCallable<
        { id: string; body: UpdateRequest },
        { message: string; user: UserRecord }
      >(
        functions,
        "users-updateUser"
      )(body);

      return res.data;
    },
  });

const updatePermissions = () =>
  mutationOptions({
    mutationKey: [...MUTATION_KEY, "updatePermissions"] as const,
    mutationFn: async (body: { id: string; permissions: Permissions }) => {
      const res = await httpsCallable<
        { id: string; permissions: Permissions },
        { message: string; permissions: Permissions }
      >(
        functions,
        "users-updateUserPermissions"
      )(body);

      return res.data;
    },
  });

export const userMutations = {
  update,
  updatePermissions,
};
