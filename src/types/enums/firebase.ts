export enum FirebaseErrorCode {
  INVALID_APP_CREDENTIAL = "auth/invalid-app-credential",
  INVALID_CREDENTIAL = "auth/invalid-credential",
  INVALID_VERIFICATION_CODE = "auth/invalid-verification-code",
  INVALID_VERIFICATION_ID = "auth/invalid-verification-id",
  MISSING_PASSWORD = "auth/missing-password",
  MULTI_FACTOR_AUTH_REQUIRED = "auth/multi-factor-auth-required",
  TOO_MANY_ATTEMPTS = "auth/too-many-requests",
  WRONG_PASSWORD = "auth/wrong-password",
}

export enum FirebaseCollectionId {
  CLIENTS = "clients",
  MATERIALS = "materials",
}
