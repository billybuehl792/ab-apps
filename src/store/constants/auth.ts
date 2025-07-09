import { AuthRole } from "../enums/auth";
import type { Company } from "../types/companies";
import type { Permissions } from "../types/auth";

const DEFAULT_COMPANY_THUMBNAIL =
  "https://www.eia.gov/consumption/commercial/images/WarehouseStorage.png";

export const DEFAULT_COMPANY: Company = {
  id: "default",
  label: "Default Company",
  description: "This is the default company.",
  thumbnail: DEFAULT_COMPANY_THUMBNAIL,
};

export const DEFAULT_PERMISSIONS: Permissions = {
  role: AuthRole.BASIC,
};

/** Queries & Mutations */

export const AuthKey = ["auth"] as const;
export const AuthQueryKeys = {
  company: [...AuthKey, "company"],
  permissions: [...AuthKey, "permissions"],
  token: [...AuthKey, "token"],
} as const;
export const AuthMutationKeys = {
  sendEmailVerification: [...AuthKey, "sendEmailVerification"],
  sendPhoneVerificationCode: [...AuthKey, "sendPhoneVerificationCode"],
  signIn: [...AuthKey, "signIn"],
  signOut: [...AuthKey, "signOut"],
  updatePermissions: [...AuthKey, "updatePermissions"],
  verifyPhoneCode: [...AuthKey, "verifyPhoneCode"],
} as const;
