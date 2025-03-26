import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  getDocs,
  query,
  type QueryConstraint,
} from "firebase/firestore";
import { clientCollection, materialCollection } from "./collections";
import type { Client, Material } from "./types";

const getMaterialList = (...constraints: QueryConstraint[]) =>
  queryOptions({
    queryKey: [materialCollection.path, ...constraints] as const,
    queryFn: async ({ queryKey: [_, ...constraints] }): Promise<Material[]> => {
      const q = query(materialCollection, ...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });

const getClient = (id: string) =>
  queryOptions({
    queryKey: [materialCollection.path, id] as const,
    queryFn: async ({ queryKey: [_, id] }): Promise<Client> => {
      const docRef = doc(clientCollection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Client does not exist");

      return { id: docSnap.id, ...docSnap.data() };
    },
  });

export const firestoreQueries = { getMaterialList, getClient };
