import { collection } from "firebase/firestore";
import { db } from ".";
import type { ClientData, MaterialData } from "@/firebase/types";

const clientCollection = collection(db, "clients").withConverter<ClientData>({
  toFirestore: (client: ClientData) => client,
  fromFirestore: (snapshot, options): ClientData =>
    snapshot.data(options) as ClientData,
});

const materialCollection = collection(
  db,
  "materials"
).withConverter<MaterialData>({
  toFirestore: (material: MaterialData) => material,
  fromFirestore: (snapshot, options): MaterialData =>
    snapshot.data(options) as MaterialData,
});

export { clientCollection, materialCollection };
