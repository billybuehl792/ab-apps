import { AuthRole } from "../enums/auth";
import type { Company } from "./companies";

export type Permissions = { role: AuthRole | null };

export type Profile = {
  company: Company | null;
  permissions: Permissions | null;
};
