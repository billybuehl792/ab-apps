import { getAuth } from "firebase-admin/auth";
import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { authUtils } from "../utils/auth";
import { AuthRole } from "../enums/auth";
import type { Permissions } from "../types/auth";

// FETCH

export const getUser = onCall<{ id: string }>(async (request) => {
  await authUtils.authGuard(request, {
    permissions: { role: AuthRole.SUPER_ADMIN },
  });

  try {
    return await getAuth().getUser(request.data.id);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});

export const getUserList = onCall<{ maxResults?: number; pageToken?: string }>(
  async (request) => {
    await authUtils.authGuard(request, {
      permissions: { role: AuthRole.SUPER_ADMIN },
    });

    try {
      return await getAuth().listUsers(
        request.data.maxResults,
        request.data.pageToken ?? undefined
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new HttpsError("invalid-argument", message);
    }
  }
);

export const getUserPermissions = onCall<{ id: string }>(async (request) => {
  await authUtils.authGuard(request, {
    permissions: { role: AuthRole.SUPER_ADMIN },
  });

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
  await authUtils.authGuard(request, {
    permissions: { role: AuthRole.SUPER_ADMIN },
  });

  try {
    const auth = getAuth();

    if (!Object.values(AuthRole).includes(request.data.permissions.role))
      throw new Error(
        `Role must be one of: ${Object.values(AuthRole).join(", ")}`
      );

    const user = await auth.getUser(request.data.id);
    const permissions: Permissions = { role: request.data.permissions.role };
    await auth.setCustomUserClaims(user.uid, {
      ...user.customClaims,
      role: permissions.role,
    });

    logger.info("User permissions updated", user, permissions);
    return {
      message: `${user.displayName} permissions updated`,
      permissions,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});
