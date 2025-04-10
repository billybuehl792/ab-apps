import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  getDocs,
  query,
  type QueryConstraint,
} from "firebase/firestore";

import materials from "@/lib/collections/firebase/materials";

export const getMaterial = (id: string) =>
  queryOptions({
    queryKey: [materials.path, id] as const,
    queryFn: async ({ queryKey: [_, id] }) => {
      const docRef = doc(materials, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Material does not exist");

      return docSnap;
    },
  });

export const getMaterialList = (...constraints: QueryConstraint[]) =>
  queryOptions({
    queryKey: [materials.path, ...constraints] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(materials, ...constraints)),
  });
