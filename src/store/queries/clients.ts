import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { searchClient } from "../config/algolia";
import { firebaseUtils } from "../utils/firebase";
import type { QueryParams } from "../types/queries";
import type { Client } from "../types/clients";

const count = (companyId: string, params?: QueryParams) =>
  queryOptions({
    queryKey: [...clientQueries(companyId).queryKey, "count", params] as const,
    queryFn: () =>
      getCountFromServer(
        query(
          firebaseUtils.collections.getClientCollection(companyId),
          ...firebaseUtils.queries.getQueryConstraints(params)
        )
      ),
  });

const list = (companyId: string, params?: QueryParams) =>
  queryOptions({
    queryKey: [...clientQueries(companyId).queryKey, "list", params] as const,
    queryFn: () =>
      getDocs(
        query(
          firebaseUtils.collections.getClientCollection(companyId),
          ...firebaseUtils.queries.getQueryConstraints(params)
        )
      ),
  });

const detail = (companyId: string, id: string) =>
  queryOptions({
    queryKey: [...clientQueries(companyId).queryKey, "detail", id] as const,
    queryFn: async () => {
      const docRef = doc(
        firebaseUtils.collections.getClientCollection(companyId),
        id
      );
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Client does not exist");

      return docSnap;
    },
  });

const search = (companyId: string, term?: string) =>
  queryOptions({
    queryKey: [...clientQueries(companyId).queryKey, "search", term] as const,
    queryFn: () =>
      searchClient.searchSingleIndex<Omit<Client, "id"> & { objectID: string }>(
        {
          indexName: `${companyId}_clients`,
          searchParams: { query: term, filters: "NOT archived:true" },
        }
      ),
  });

export const clientQueries = Object.assign(
  (companyId?: string) => {
    const queryKey = companyId
      ? (["clients", companyId] as const)
      : (["clients"] as const);
    return { queryKey };
  },
  { count, detail, list, search }
);
