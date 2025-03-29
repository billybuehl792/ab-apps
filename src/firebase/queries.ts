import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  getDocs,
  query,
  type QueryConstraint,
} from "firebase/firestore";
import { clientCollection, materialCollection } from "./collections";

const getMaterialList = (...constraints: QueryConstraint[]) =>
  queryOptions({
    queryKey: [materialCollection.path, ...constraints] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(materialCollection, ...constraints)),
  });

const getClient = (id: string) =>
  queryOptions({
    queryKey: [clientCollection.path, id] as const,
    queryFn: async ({ queryKey: [_, id] }) => {
      const docRef = doc(clientCollection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Client does not exist");

      return docSnap;
    },
  });

export const firestoreQueries = { getMaterialList, getClient };
