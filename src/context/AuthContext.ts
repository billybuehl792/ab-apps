import { createContext } from "react";
import type { User } from "firebase/auth";
import type { Company, Permissions } from "@/types/auth";

export default createContext<{
  user: User | null;
  company: Company | null;
  permissions: Permissions | null;
}>({
  user: null,
  company: null,
  permissions: null,
});
