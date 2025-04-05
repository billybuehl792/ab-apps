import { collection } from "firebase/firestore";
import { db } from ".";
import type { ClientData, MaterialData } from "@/firebase/types";

const clientCollection = collection(db, "clients").withConverter<ClientData>({
  toFirestore: (client: ClientData) => ({
    first_name: client.first_name.trim(),
    last_name: client.last_name.trim(),
    email: client.email.trim(),
    phone: client.phone.trim(),
    address: client.address.trim(),
  }),
  fromFirestore: (snapshot, options): ClientData =>
    snapshot.data(options) as ClientData,
});

const materialCollection = collection(
  db,
  "materials"
).withConverter<MaterialData>({
  toFirestore: (material: MaterialData) => ({
    label: material.label.toTitleCase().trim(),
    value: +material.value,
    description: material.description || "",
  }),
  fromFirestore: (snapshot, options): MaterialData =>
    snapshot.data(options) as MaterialData,
});

export { clientCollection, materialCollection };
