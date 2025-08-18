import { AuthRole } from "../enums/auth";
import { Permissions } from "../types/auth";
import type { Company } from "../types/companies";

export const DEFAULT_COMPANY: Company = {
  id: "default",
  label: "Default Company",
  description: "This is the default company.",
  thumbnail: "",
  archived: false,
};

export const DEFAULT_PERMISSIONS: Permissions = {
  role: AuthRole.STANDARD,
};

export const AuthRoleLabel: { [key in AuthRole]: string } = {
  [AuthRole.SUPER_ADMIN]: "Super Admin",
  [AuthRole.ADMIN]: "Admin",
  [AuthRole.STANDARD]: "User",
};

export const AuthRoleLevel: { [key in AuthRole]: number } = {
  [AuthRole.SUPER_ADMIN]: 3,
  [AuthRole.ADMIN]: 2,
  [AuthRole.STANDARD]: 1,
};
