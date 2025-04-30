import { type QueryDocumentSnapshot } from "firebase/firestore";

type DocumentBase = Pick<QueryDocumentSnapshot, "id">;

export type Client = DocumentBase & ClientData;
export interface ClientData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: Address;
}

export type Material = DocumentBase & MaterialData;
export interface MaterialData {
  label: string;
  value: number;
  description: string;
}

export interface Address {
  place_id: string;
  primary_text: string;
  secondary_text: string;
  text: string;
}
