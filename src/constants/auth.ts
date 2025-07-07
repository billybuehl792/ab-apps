import type { Company, Permissions } from "@/types/auth";
import { AuthRole } from "@/types/enums/auth";

export const DEFAULT_COMPANY: Company = {
  id: "default",
  label: "Default Company",
  description: "This is the default company.",
  thumbnail:
    "https://www.eia.gov/consumption/commercial/images/WarehouseStorage.png",
};

export const DEFAULT_PERMISSIONS: Permissions = {
  role: AuthRole.BASIC,
};
