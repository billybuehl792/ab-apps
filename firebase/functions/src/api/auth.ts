import { getAuth } from "firebase-admin/auth";
import { HttpsError, onCall } from "firebase-functions/https";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { AuthRole } from "../enums/auth";
import type { Permissions } from "../types/auth";

// FETCH

export const getUserPermissions = onCall<{ id: string }>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const userId = String(request.data.id);
    const user = await getAuth().getUser(userId);

    const role = String(user.customClaims?.role);
    if (!Object.values(AuthRole).includes(role as AuthRole))
      throw new Error(
        `User does not have a valid role. To access the app, an admin must configure a role for this user.`
      );

    return { role };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});

export const getUserCompany = onCall<{ id: string }>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const userId = String(request.data.id);
    const user = await getAuth().getUser(userId);
    const companyId = String(user.customClaims?.companyId);

    if (!companyId)
      throw new Error(
        "User does not belong to a company. A company must be configured by an admin."
      );

    const company = await getFirestore()
      .collection("companies")
      .doc(companyId)
      .get();
    if (!company.exists)
      throw new Error(
        "The company this user belongs to does not exist. An admin must reconfigure this user."
      );

    return { id: company.id, ...company.data() };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});

// UPDATE

export const updateUserPermissions = onCall<{
  id: string;
  permissions: { role: string };
}>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Only admins can set user roles");

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
