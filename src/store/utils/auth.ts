import { type ContextType } from "react";
import AuthContext from "@/context/AuthContext";
import { AuthRoleLevel } from "../constants/auth";
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
  if (options?.permissions) {
    if (
      AuthRoleLevel[auth.permissions.role] <
      AuthRoleLevel[options.permissions.role]
    )
      return handleDenied("Insufficient permissions to access this resource");
  }

  return true;
};

export const authUtils = { authGuard };
