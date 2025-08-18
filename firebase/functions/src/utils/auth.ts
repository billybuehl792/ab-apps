import { getAuth, type UserRecord } from "firebase-admin/auth";
import { HttpsError, type CallableRequest } from "firebase-functions/https";
import { AuthRole } from "../enums/auth";
import { AuthRoleLevel } from "../constants/auth";
import type { Permissions } from "../types/auth";

const getUserPermissions = (user: UserRecord): Permissions | null => {
  const role = String(user.customClaims?.role);
  if (!Object.values(AuthRole).includes(role as AuthRole)) return null;

  return { role: role as AuthRole };
};

const authGuard = async (
  request: CallableRequest,
  options?: { permissions?: Permissions }
) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  if (options?.permissions) {
    const user = await getAuth().getUser(request.auth.uid);
    const userPermissions = getUserPermissions(user);
    if (
      !userPermissions ||
      AuthRoleLevel[userPermissions.role] <
        AuthRoleLevel[options.permissions.role]
    )
      throw new HttpsError("permission-denied", "Insufficient permissions");
  }

  return true;
};

export const authUtils = { getUserPermissions, authGuard };
