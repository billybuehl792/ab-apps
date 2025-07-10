import { getAuth } from "firebase-admin/auth";
import * as logger from "firebase-functions/logger";
import { HttpsError, onCall } from "firebase-functions/https";
import { AuthRole } from "../enums/auth";
import { getFirestore } from "firebase-admin/firestore";

// FETCH

export const getUserPermissions = onCall<{ id: string }>(async (request) => {
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const id = String(request.data.id);
    const user = await getAuth().getUser(id);
    return { role: user.customClaims?.role };
  } catch (error) {
    throw new HttpsError(
      "invalid-argument",
      "Error retrieving user permissions"
    );
  }
});

export const getUserCompany = onCall<{ id: string }>(async (request) => {
  console.log("getUserCompany called with id:", request.data.id);
  if (!request.auth)
    throw new HttpsError("permission-denied", "Authentication required");

  try {
    const id = String(request.data.id);
    const user = await getAuth().getUser(id);
    const companyId = String(user.customClaims?.companyId);
    const company = await getFirestore()
      .collection("companies")
      .doc(companyId)
      .get();
    if (!company.exists) throw new Error("Company does not exist");
    return { id: company.id, ...company.data() };
  } catch (error) {
    throw new HttpsError("invalid-argument", "Error retrieving user company");
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
    const id = String(request.data.id);
    const role = String(request.data.permissions.role);

    if (!Object.values(AuthRole).includes(role as AuthRole))
      throw new Error(
        `Role must be one of: ${Object.values(AuthRole).join(", ")}`
      );

    const user = await getAuth().getUser(id);
    const permissions = { role };
    await getAuth().setCustomUserClaims(user.uid, {
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
