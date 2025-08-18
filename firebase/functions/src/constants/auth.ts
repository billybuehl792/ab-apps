import { AuthRole } from "../enums/auth";

export const AuthRoleLevel: { [key in AuthRole]: number } = {
  [AuthRole.SUPER_ADMIN]: 3,
  [AuthRole.ADMIN]: 2,
  [AuthRole.STANDARD]: 1,
};
