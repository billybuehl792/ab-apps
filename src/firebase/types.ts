import { type QueryDocumentSnapshot } from "firebase/firestore";

export type Client = Pick<QueryDocumentSnapshot, "id"> & ClientData;
export interface ClientData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

export type Material = Pick<QueryDocumentSnapshot, "id"> & MaterialData;
export interface MaterialData {
  label: string;
  value: number;
  description: string;
}
