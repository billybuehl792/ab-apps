import { type ContextType } from "react";
import { type ParsedToken } from "firebase/auth";
import AuthContext from "@/store/context/AuthContext";
import { AuthRoleLevel } from "../constants/auth";
import { AuthRole } from "../enums/auth";
import type { Permissions } from "../types/auth";

/**
 * Checks if the user is authenticated and has the required permissions.
 * If the user is not authenticated or does not have sufficient permissions,
 * an error is thrown.
 * @param auth - The authentication context containing user and permissions.
 * @param options.permissions - The required permissions to access the resource.
 * @param options.throw - Whether to throw an error if the user is not authenticated or permissions are insufficient.
 * @return True if the user is authenticated and has the required permissions, otherwise false or throws an error based on options.
 */
export const authGuard = (
  auth: ContextType<typeof AuthContext>,
  options?: { permissions?: Permissions; throw?: boolean }
) => {
  const handleDenied = (message: string) => {
    if (options?.throw) throw new Error(message);
    return false;
  };

  if (!auth.user) return handleDenied("User is not authenticated");
  if (options?.permissions?.role) {
    if (
      !auth.profile.permissions?.role ||
      AuthRoleLevel[auth.profile.permissions.role] <
        AuthRoleLevel[options.permissions.role]
    )
      return handleDenied("Insufficient permissions to access this resource");
  }

  return true;
};

/**
 * Checks if the user is configured with a company and permissions.
 * @param auth - The authentication context containing user and permissions.
 * @returns True if the user is configured, otherwise false.
 */
export const userProfileIsValid = (auth: ContextType<typeof AuthContext>) => {
  return !!auth.profile.company && !!auth.profile.permissions;
};

export const getCompanyIdFromCustomClaims = (claims?: ParsedToken) => {
  const rawCompanyId = claims?.companyId;
  return typeof rawCompanyId === "string" || typeof rawCompanyId === "number"
    ? String(rawCompanyId)
    : null;
};

export const getPermissionsFromCustomClaims = (claims?: ParsedToken) => {
  const role = claims?.role;
  if (
    typeof role === "string" &&
    Object.values(AuthRole).includes(role as AuthRole)
  )
    return { role } as Permissions;

  return null;
};

export const authUtils = {
  authGuard,
  userProfileIsValid,
  getCompanyIdFromCustomClaims,
  getPermissionsFromCustomClaims,
};
