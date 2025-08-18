import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { FirebaseCollection } from "../enums/firebase";
import { searchClient } from "../config/algolia";
import { firebaseUtils } from "../utils/firebase";
import { QueryVariant } from "../enums/queries";
import type { QueryParams } from "../types/queries";
import type { Client } from "../types/clients";

const count = (companyId: string, params?: QueryParams) =>
  queryOptions({
    queryKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      QueryVariant.COUNT,
      params,
    ] as const,
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
    queryKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      QueryVariant.LIST,
      params,
    ] as const,
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
    queryKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      QueryVariant.DETAIL,
      id,
    ] as const,
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
    queryKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      QueryVariant.SEARCH,
      term,
    ] as const,
    queryFn: () =>
      searchClient.searchSingleIndex<Omit<Client, "id"> & { objectID: string }>(
        {
          indexName: `${companyId}_clients`,
          searchParams: { query: term, filters: "NOT archived:true" },
        }
      ),
  });

export const clientQueries = {
  count,
  list,
  detail,
  search,
};
