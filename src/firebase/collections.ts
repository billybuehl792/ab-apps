import { collection } from "firebase/firestore";
import { db } from ".";
import type { Client, Material } from "@/firebase/types";

const clientCollection = collection(db, "clients").withConverter<
  Omit<Client, "id">
>({
  toFirestore: (client: Omit<Client, "id">) => client,
  fromFirestore: (snapshot, options): Omit<Client, "id"> =>
    snapshot.data(options) as Omit<Client, "id">,
});

const materialCollection = collection(db, "materials").withConverter<
  Omit<Material, "id">
>({
  toFirestore: (material: Omit<Material, "id">) => material,
  fromFirestore: (snapshot, options): Omit<Material, "id"> =>
    snapshot.data(options) as Omit<Material, "id">,
});

export { clientCollection, materialCollection };
