import { type QueryDocumentSnapshot } from "firebase/firestore";

type DocumentBase = Pick<QueryDocumentSnapshot, "id">;

export type Client = DocumentBase & ClientData;
export interface ClientData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

export type Material = DocumentBase & MaterialData;
export interface MaterialData {
  label: string;
  value: number;
  description: string;
}
