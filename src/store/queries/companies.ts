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

const count = (params?: QueryParams) =>
  queryOptions({
    queryKey: [...companyQueries().queryKey, "count", params] as const,
    queryFn: () =>
      getCountFromServer(
        query(
          firebaseUtils.collections.getCompanyCollection(),
          ...firebaseUtils.queries.getQueryConstraints(params)
        )
      ),
  });

const list = (params?: QueryParams) =>
  queryOptions({
    queryKey: [...companyQueries().queryKey, "list", params] as const,
    queryFn: () =>
      getDocs(
        query(
          firebaseUtils.collections.getCompanyCollection(),
          ...firebaseUtils.queries.getQueryConstraints(params)
        )
      ),
  });

const detail = (id: string) =>
  queryOptions({
    queryKey: [...companyQueries().queryKey, "detail", id] as const,
    queryFn: async () => {
      const docRef = doc(firebaseUtils.collections.getCompanyCollection(), id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Company does not exist");

      return docSnap;
    },
  });

export const companyQueries = Object.assign(
  () => ({ queryKey: ["companies"] as const }),
  { count, list, detail }
);
