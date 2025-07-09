import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  type QueryConstraint,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSnackbar } from "notistack";
import { db } from "@/store/config/firebase";
import useAuth from "./useAuth";
import { searchClient } from "@/store/config/algolia";
import { clientConverter } from "@/store/converters";
import { markdownUtils } from "@/store/utils/markdown";
import { DEFAULT_COMPANY } from "@/store/constants/auth";
import { FirebaseCollection } from "@/store/enums/firebase";
import type { Client } from "@/store/types/clients";

const useClients = () => {
  /** Values */

  const { enqueueSnackbar } = useSnackbar();
  const { company } = useAuth();

  const col = collection(
    db,
    `${FirebaseCollection.COMPANIES}/${company?.id ?? DEFAULT_COMPANY.id}/${FirebaseCollection.CLIENTS}`
  ).withConverter(clientConverter);

  /** Queries */

  const count = (...constraints: QueryConstraint[]) =>
    queryOptions({
      queryKey: [col.id, "count", constraints] as const,
      queryFn: () => getCountFromServer(query(col, ...constraints)),
    });

  const detail = (id: string) =>
    queryOptions({
      queryKey: [col.id, "detail", id] as const,
      queryFn: async () => {
        const docRef = doc(col, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error("Client does not exist");

        return docSnap;
      },
    });

  const list = (...constraints: QueryConstraint[]) =>
    queryOptions({
      queryKey: [col.id, "list", constraints] as const,
      queryFn: () => getDocs(query(col, ...constraints)),
    });

  const search = (term?: string) =>
    queryOptions({
      queryKey: [col.id, "search", term] as const,
      queryFn: () =>
        searchClient.searchSingleIndex<
          Omit<Client, "id"> & { objectID: string }
        >({
          indexName: col.path,
          searchParams: { query: term, filters: "NOT archived:true" },
        }),
    });

  /** Mutations */

  const create = useMutation({
    mutationKey: [col.id, "create"],
    mutationFn: (data: Omit<Client, "id">) => addDoc(col, data),
    onSuccess: (_, data) =>
      enqueueSnackbar(
        `${markdownUtils.bold(data.first_name + " " + data.last_name)} client created`,
        { variant: "success" }
      ),
    onError: () =>
      enqueueSnackbar("Error creating client", { variant: "error" }),
  });

  const update = useMutation({
    mutationKey: [col.id, "update"],
    mutationFn: async ({ id, ...data }: Client) => {
      const docRef = doc(col, id);
      await setDoc(docRef, data);
    },
    onSuccess: (_, data) =>
      enqueueSnackbar(
        `${markdownUtils.bold(data.first_name + " " + data.last_name)} updated`,
        { variant: "success" }
      ),
    onError: () =>
      enqueueSnackbar("Error updating client", {
        variant: "error",
      }),
  });

  const archive = useMutation({
    mutationKey: [col.id, "archive"],
    mutationFn: async (id: string) => {
      const docRef = doc(col, id);
      await updateDoc(docRef, { archived: true });
    },
    onSuccess: () => enqueueSnackbar("Client deleted", { variant: "success" }),
    onError: () =>
      enqueueSnackbar("Error deleting client", { variant: "error" }),
  });

  const unarchive = useMutation({
    mutationKey: [col.id, "unarchive"],
    mutationFn: async (id: string) => {
      const docRef = doc(col, id);
      await updateDoc(docRef, { archived: false });
    },
    onSuccess: () => enqueueSnackbar("Client restored", { variant: "success" }),
    onError: () =>
      enqueueSnackbar("Error restoring client", { variant: "error" }),
  });

  return {
    collection: col,
    queries: { count, detail, list, search },
    mutations: { create, update, archive, unarchive },
  };
};

export default useClients;
