import { mutationOptions } from "@tanstack/react-query";
import {
  signOut as _signOut,
  type User,
  updateProfile as _updateProfile,
} from "firebase/auth";
import { QUERY_KEY } from "../constants/queries";

const updateProfile = () =>
  mutationOptions({
    mutationKey: [...QUERY_KEY.profile, "updateProfile"] as const,
    mutationFn: ({
      user,
      ...data
    }: {
      user: User;
      displayName?: string;
      photoUrl?: string;
    }) => _updateProfile(user, data),
  });

export const profileMutations = {
  updateProfile,
};
