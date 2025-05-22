import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  getDocs,
  query,
  type QueryDocumentSnapshot,
  type QueryConstraint,
} from "firebase/firestore";

import clientCollection from "@/lib/collections/firebase/clientCollection";

export const getClientList = (...constraints: QueryConstraint[]) =>
  queryOptions({
    queryKey: [clientCollection.path, ...constraints] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(clientCollection, ...constraints)),
  });

export const getClient = (id: QueryDocumentSnapshot["id"]) =>
  queryOptions({
    queryKey: [clientCollection.path, id] as const,
    queryFn: async ({ queryKey: [_, id] }) => {
      const docRef = doc(clientCollection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Client does not exist");

      return docSnap;
    },
  });
