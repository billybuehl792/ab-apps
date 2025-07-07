import { AuthRole } from "./enums/auth";

export type Company = {
  id: string;
  label: string;
  description: string;
  thumbnail: string;
};

export type Permissions = {
  role: AuthRole;
};
