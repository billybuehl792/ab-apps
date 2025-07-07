/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();
const auth = getAuth();
const db = getFirestore();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const setUserCustomClaims = onRequest(async (request, response) => {
  try {
    const uid = String(request.body.uid);
    const companyId = String(request.body.companyId);

    const user = await auth.getUser(uid);
    const company = await db.collection("companies").doc(companyId).get();
    if (!company.exists) throw new Error("Company does not exist");

    const customClaims = { ...user.customClaims, companyId };
    await auth.setCustomUserClaims(uid, customClaims);
    response.send(`customClaims set: ${JSON.stringify(customClaims)}`);
  } catch (error) {
    console.error("Error setting custom claims:", error);
    response.status(500).send("Error setting custom claims");
  }
});
