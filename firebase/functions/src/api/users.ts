import { getAuth } from "firebase-admin/auth";
import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { authUtils } from "../utils/auth";
import { AuthRole } from "../enums/auth";
import type { Permissions } from "../types/auth";

// FETCH

export const getUserList = onCall(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const user = await getAuth().getUser(String(request.auth.uid));
    if (!authUtils.isAdmin(user))
      throw new Error(
        `User does not have a valid role. User must be an admin to access the list of users.`
      );

    return await getAuth().listUsers();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});

export const getUserPermissions = onCall<{ id: string }>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const user = await getAuth().getUser(String(request.data.id));
    return authUtils.getUserPermissions(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});

// UPDATE

export const updatePermissions = onCall<{
  id: string;
  permissions: Permissions;
}>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const userId = String(request.data.id);
    const role = String(request.data.permissions.role);

    if (!Object.values(AuthRole).includes(role as AuthRole))
      throw new Error(
        `Role must be one of: ${Object.values(AuthRole).join(", ")}`
      );

    const user = await getAuth().getUser(userId);
    const permissions: Permissions = { role: role as AuthRole };
    await getAuth().setCustomUserClaims(user.uid, {
      ...user.customClaims,
      role: permissions.role,
    });

    logger.info("User permissions updated", user, permissions);
    return {
      message: `${user.displayName} permissions updated`,
      permissions,
    };
  } catch (error) {
    throw new HttpsError("invalid-argument", "Error setting user role");
  }
});
