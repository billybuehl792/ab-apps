import { type UserRecord } from "firebase-admin/auth";
import { AuthRole } from "../enums/auth";
import type { Permissions } from "../types/auth";

const isAdmin = (user: UserRecord) => {
  const role = String(user.customClaims?.role);
  return Object.values(AuthRole).includes(role as AuthRole);
};

const getUserPermissions = (user: UserRecord): Permissions | null => {
  const role = String(user.customClaims?.role);
  if (!Object.values(AuthRole).includes(role as AuthRole)) return null;

  return { role: role as AuthRole };
};

export const authUtils = { isAdmin, getUserPermissions };
