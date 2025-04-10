import { collection } from "firebase/firestore";

import { db } from "@/lib/config/firebase";
import type { MaterialData } from "@/types/firebase";
import { FirebaseCollectionId } from "@/types/enums/firebase";

export default collection(
  db,
  FirebaseCollectionId.MATERIALS
).withConverter<MaterialData>({
  toFirestore: (material: MaterialData) => ({
    label: material.label.trim(),
    value: +material.value,
    description: material.description || "",
  }),
  fromFirestore: (snapshot, options): MaterialData =>
    snapshot.data(options) as MaterialData,
});
