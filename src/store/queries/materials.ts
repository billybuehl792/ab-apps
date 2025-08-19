import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { firebaseUtils } from "../utils/firebase";
import type { QueryParams } from "../types/queries";

const count = (companyId: string, params?: QueryParams) =>
  queryOptions({
    queryKey: [
      ...materialQueries(companyId).queryKey,
      "count",
      params,
    ] as const,
    queryFn: () =>
      getCountFromServer(
        query(
          firebaseUtils.collections.getMaterialCollection(companyId),
          ...firebaseUtils.queries.getQueryConstraints(params)
        )
      ),
  });

const list = (companyId: string, params?: QueryParams) =>
  queryOptions({
    queryKey: [...materialQueries(companyId).queryKey, "list", params] as const,
    queryFn: () =>
      getDocs(
        query(
          firebaseUtils.collections.getMaterialCollection(companyId),
          ...firebaseUtils.queries.getQueryConstraints(params)
        )
      ),
  });

const detail = (companyId: string, id: string) =>
  queryOptions({
    queryKey: [...materialQueries(companyId).queryKey, "detail", id] as const,
    queryFn: async () => {
      const docRef = doc(
        firebaseUtils.collections.getMaterialCollection(companyId),
        id
      );
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Material does not exist");

      return docSnap;
    },
  });

export const materialQueries = Object.assign(
  (companyId?: string) => {
    const queryKey = companyId
      ? (["materials", companyId] as const)
      : (["materials"] as const);
    return { queryKey };
  },
  { count, detail, list }
);
