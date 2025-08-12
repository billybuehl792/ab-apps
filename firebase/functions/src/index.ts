/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from "firebase-admin/app";
import * as users from "./api/users";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp({ projectId: "ab-apps-5d45b" });

export { users };
