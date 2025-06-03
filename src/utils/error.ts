import { FirebaseErrorCode } from "@/types/enums/firebase";
import type { FirebaseError } from "firebase/app";

export const getErrorMessage = (error: Error) => {
  if (error.name === "FirebaseError")
    return getFirebaseErrorMessage(error as FirebaseError);
  else return error.message;
};

const getFirebaseErrorMessage = (error: FirebaseError) => {
  switch (error.code as FirebaseErrorCode) {
    case FirebaseErrorCode.INVALID_APP_CREDENTIAL:
      return "Invalid app credential";
    case FirebaseErrorCode.INVALID_CREDENTIAL:
      return "Invalid credential";
    case FirebaseErrorCode.INVALID_VERIFICATION_CODE:
      return "Invalid verification code";
    case FirebaseErrorCode.INVALID_VERIFICATION_ID:
      return "Invalid verification ID";
    case FirebaseErrorCode.MISSING_PASSWORD:
      return "Missing password";
    case FirebaseErrorCode.MULTI_FACTOR_AUTH_REQUIRED:
      return "Multi-factor authentication required";
    case FirebaseErrorCode.WRONG_PASSWORD:
      return "Wrong password";
    case FirebaseErrorCode.TOO_MANY_ATTEMPTS:
      return "Too many sign in attempts, please try again later";
    default:
      return error.message;
  }
};

export const isMfaError = (error: unknown) => {
  return (
    (error as FirebaseError).code ===
    (FirebaseErrorCode.MULTI_FACTOR_AUTH_REQUIRED as string)
  );
};
