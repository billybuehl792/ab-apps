import type { Address } from "./locations";

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: Address;
  archived: boolean;
}
