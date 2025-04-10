import { FirebaseErrorCode } from "../../types/enums/firebase";
import type { FirebaseError } from "firebase/app";

export const getErrorMessage = (error: Error): string => {
  if (error.name === "FirebaseError")
    return getFirebaseErrorMessage(error as FirebaseError);
  else return error.message;
};

const getFirebaseErrorMessage = (error: FirebaseError): string => {
  if (error.code === FirebaseErrorCode.INVALID_CREDENTIAL)
    return "Invalid credentials";
  else if (error.code === FirebaseErrorCode.WRONG_PASSWORD)
    return "Incorrect password";
  else if (error.code === FirebaseErrorCode.MULTI_FACTOR_AUTH_REQUIRED)
    return "Multi-factor authentication required";
  else if (error.code === FirebaseErrorCode.MISSING_PASSWORD)
    return "Password required";
  else if (error.code === FirebaseErrorCode.INVALID_VERIFICATION_CODE)
    return "Invalid verification code";
  else if (error.code === FirebaseErrorCode.INVALID_VERIFICATION_ID)
    return "Invalid verification ID";

  return error.message;
};
