import { getAuth } from "firebase-admin/auth";
import { HttpsError, onCall } from "firebase-functions/https";
import { getFirestore } from "firebase-admin/firestore";
import { authUtils } from "../utils/auth";

// FETCH

export const getPermissions = onCall(async (request) => {
  await authUtils.authGuard(request);

  try {
    const user = await getAuth().getUser(request.auth?.uid ?? "");
    return authUtils.getUserPermissions(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpsError("invalid-argument", message);
  }
});

export const getCompany = onCall(async (request) => {
  await authUtils.authGuard(request);

  try {
    const user = await getAuth().getUser(request.auth?.uid ?? "");
    const company = await getFirestore()
      .collection("companies")
      .doc(String(user.customClaims?.companyId))
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
