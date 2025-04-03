import { collection } from "firebase/firestore";
import { db } from ".";
import type { ClientData, MaterialData } from "@/firebase/types";

const clientCollection = collection(db, "clients").withConverter<ClientData>({
  toFirestore: (client: ClientData) => ({
    first_name: client.first_name,
    last_name: client.last_name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    city: client.city,
    state: client.state,
    zip: +client.zip,
  }),
  fromFirestore: (snapshot, options): ClientData =>
    snapshot.data(options) as ClientData,
});

const materialCollection = collection(
  db,
  "materials"
).withConverter<MaterialData>({
  toFirestore: (material: MaterialData) => ({
    label: material.label,
    value: +material.value,
    description: material.description || "",
  }),
  fromFirestore: (snapshot, options): MaterialData =>
    snapshot.data(options) as MaterialData,
});

export { clientCollection, materialCollection };
