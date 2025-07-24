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

const search = (companyId: string, term?: string) =>
  queryOptions({
    queryKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      QueryVariant.LIST,
      term,
    ] as const,
    queryFn: () =>
      searchClient.searchSingleIndex<Omit<Client, "id"> & { objectID: string }>(
        {
          indexName:
            firebaseUtils.collections.getClientCollection(companyId).path,
          searchParams: { query: term, filters: "NOT archived:true" },
        }
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

export const clientQueries = {
  count,
  list,
  detail,
  search,
};
