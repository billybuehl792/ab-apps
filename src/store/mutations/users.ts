import { mutationOptions } from "@tanstack/react-query";
import { type UserRecord, type UpdateRequest } from "firebase-admin/auth";
import { updateProfile, User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import { userQueries } from "../queries/users";
import type { Permissions } from "../types/auth";

const update = () =>
  mutationOptions({
    mutationKey: [...userQueries().queryKey, "update"] as const,
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

const updateUserProfile = () =>
  mutationOptions({
    mutationKey: [...userQueries().queryKey, "updateUserProfile"] as const,
    mutationFn: async ({
      user,
      displayName,
      photoUrl,
    }: {
      user: User;
      displayName?: string;
      photoUrl?: string;
    }) =>
      updateProfile(user, {
        displayName: displayName ?? user.displayName ?? "",
        photoURL: photoUrl ?? user.photoURL ?? "",
      }),
  });

const updatePermissions = () =>
  mutationOptions({
    mutationKey: [...userQueries().queryKey, "updatePermissions"] as const,
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
  updateUserProfile,
  updatePermissions,
};
