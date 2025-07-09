/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();
const auth = getAuth();
const db = getFirestore();

export const getUserPermissions = onCall<{ id: string }>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const id = String(request.data.id);
    const user = await auth.getUser(id);
    return { role: user.customClaims?.role };
  } catch (error) {
    throw new HttpsError(
      "invalid-argument",
      "Error retrieving user permissions"
    );
  }
});

export const updateUserPermissions = onCall<{
  id: string;
  permissions: { role: string };
}>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Only admins can set user roles");

  try {
    const id = String(request.data.id);
    const role = String(request.data.permissions.role);

    if (!["admin", "basic"].includes(role))
      throw new Error("Role must be 'admin' or 'basic'");

    const user = await auth.getUser(id);
    const permissions = { role };
    await auth.setCustomUserClaims(id, {
      ...user.customClaims,
      role: permissions.role,
    });
    logger.info("User permissions updated", user, permissions);

    return {
      message: `${user.displayName} permissions updated`,
      permission: { role },
    };
  } catch (error) {
    throw new HttpsError("invalid-argument", "Error setting user role");
  }
});

export const getUserCompany = onCall<{ id: string }>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const id = String(request.data.id);
    const user = await auth.getUser(id);
    const companyId = String(user.customClaims?.companyId);
    const company = await db.collection("companies").doc(companyId).get();
    if (!company.exists) throw new Error("Company does not exist");
    return { id: company.id, ...company.data() };
  } catch (error) {
    throw new HttpsError("invalid-argument", "Error retrieving user company");
  }
});
