import { queryOptions } from "@tanstack/react-query";
import {
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { FirebaseCollection } from "../enums/firebase";
import { firebaseUtils } from "../utils/firebase";
import { QueryVariant } from "../enums/queries";
import type { QueryParams } from "../types/queries";

const count = (companyId: string, params?: QueryParams) =>
  queryOptions({
    queryKey: [
      FirebaseCollection.MATERIALS,
      companyId,
      QueryVariant.COUNT,
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
    queryKey: [
      FirebaseCollection.MATERIALS,
      companyId,
      QueryVariant.LIST,
      params,
    ] as const,
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
    queryKey: [
      FirebaseCollection.MATERIALS,
      companyId,
      QueryVariant.DETAIL,
      id,
    ] as const,
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

export const materialQueries = {
  count,
  list,
  detail,
};
