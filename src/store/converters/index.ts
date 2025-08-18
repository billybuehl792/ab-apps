import {
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore";
import type { Company } from "../types/companies";
import type { Client } from "../types/clients";
import type { Material } from "../types/materials";

export const companyConverter = {
  toFirestore: (data: Omit<Company, "id">) => ({
    label: data.label.trim(),
    description: data.description || "",
    thumbnail: data.thumbnail || "",
    archived: Boolean(data.archived),
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) =>
    snapshot.data(options) as Omit<Company, "id">,
};

export const clientConverter = {
  toFirestore: (client: Omit<Client, "id">) => ({
    first_name: String(client.first_name).trim(),
    last_name: String(client.last_name).trim(),
    email: String(client.email).trim(),
    phone: String(client.phone).toPhone(),
    address: client.address,
    archived: Boolean(client.archived),
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) =>
    snapshot.data(options) as Omit<Client, "id">,
};

export const materialConverter = {
  toFirestore: (material: Omit<Material, "id">) => ({
    label: material.label.trim(),
    value: +material.value,
    description: material.description || "",
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) =>
    snapshot.data(options) as Omit<Material, "id">,
};
