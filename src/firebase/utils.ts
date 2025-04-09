import { FirebaseErrorCode } from "./enums";
import type { FirebaseError } from "firebase/app";

const getErrorMessage = (error: Error): string => {
  if (error.name !== "FirebaseError") return error.message;
  else {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code === FirebaseErrorCode.INVALID_CREDENTIAL)
      return "Invalid credentials";
    else if (
      firebaseError.code === FirebaseErrorCode.MULTI_FACTOR_AUTH_REQUIRED
    )
      return "Multi-factor authentication required";
    else if (firebaseError.code === FirebaseErrorCode.MISSING_PASSWORD)
      return "Password required";
    else if (firebaseError.code === FirebaseErrorCode.INVALID_VERIFICATION_CODE)
      return "Invalid verification code";
    else if (firebaseError.code === FirebaseErrorCode.INVALID_VERIFICATION_ID)
      return "Invalid verification ID";
    else return firebaseError.message;
  }
};

export const firebaseUtils = { getErrorMessage };
