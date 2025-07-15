import type { Company } from "../types/companies";

const DEFAULT_COMPANY_THUMBNAIL =
  "https://www.eia.gov/consumption/commercial/images/WarehouseStorage.png";

export const DEFAULT_COMPANY: Company = {
  id: "default",
  label: "Default Company",
  description: "This is the default company.",
  thumbnail: DEFAULT_COMPANY_THUMBNAIL,
};

/** Queries & Mutations */

export const AuthKey = ["auth"] as const;
export const AuthQueryKeys = {
  token: [...AuthKey, "token"],
} as const;
export const AuthMutationKeys = {
  sendEmailVerification: [...AuthKey, "sendEmailVerification"],
  sendPhoneVerificationCode: [...AuthKey, "sendPhoneVerificationCode"],
  signIn: [...AuthKey, "signIn"],
  signOut: [...AuthKey, "signOut"],
  verifyPhoneCode: [...AuthKey, "verifyPhoneCode"],
} as const;
