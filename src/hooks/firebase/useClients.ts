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
import { db } from "@/config/firebase";
import { searchClient } from "@/config/algolia";
import useAuth from "../auth/useAuth";
import { DEFAULT_COMPANY } from "@/constants/auth";
import type { Client, ClientData } from "@/types/firebase";

const useClients = () => {
  /** Values */

  const { enqueueSnackbar } = useSnackbar();
  const { company } = useAuth();

  const col = collection(
    db,
    `companies/${company?.id ?? DEFAULT_COMPANY.id}/clients`
  ).withConverter<ClientData>({
    toFirestore: (client: ClientData) => ({
      first_name: String(client.first_name).trim(),
      last_name: String(client.last_name).trim(),
      email: String(client.email).trim(),
      phone: String(client.phone).toPhone(),
      address: client.address,
      archived: Boolean(client.archived),
    }),
    fromFirestore: (snapshot, options): ClientData =>
      snapshot.data(options) as ClientData,
  });

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
        searchClient.searchSingleIndex<ClientData & { objectID: string }>({
          indexName: col.path,
          searchParams: { query: term, filters: "NOT archived:true" },
        }),
    });

  /** Mutations */

  const create = useMutation({
    mutationKey: [col.id, "create"],
    mutationFn: (data: ClientData) => addDoc(col, data),
    onSuccess: (_, data) =>
      enqueueSnackbar(`'${data.first_name} ${data.last_name}' client created`, {
        variant: "success",
      }),
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
      enqueueSnackbar(`'${data.first_name} ${data.last_name}' client updated`, {
        variant: "success",
      }),
    onError: () =>
      enqueueSnackbar("Error updating client", {
        variant: "error",
      }),
  });

  const archive = useMutation({
    mutationKey: [col.id, "archive"],
    mutationFn: async (id: Client["id"]) => {
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
