import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  getDocs,
  query,
  type QueryDocumentSnapshot,
  type QueryConstraint,
} from "firebase/firestore";

import clients from "@/lib/collections/firebase/clients";

export const getClientList = (...constraints: QueryConstraint[]) =>
  queryOptions({
    queryKey: [clients.path, ...constraints] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(clients, ...constraints)),
  });

export const getClient = (id: QueryDocumentSnapshot["id"]) =>
  queryOptions({
    queryKey: [clients.path, id] as const,
    queryFn: async ({ queryKey: [_, id] }) => {
      const docRef = doc(clients, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Client does not exist");

      return docSnap;
    },
  });
