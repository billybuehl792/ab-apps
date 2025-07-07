import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  type QueryConstraint,
  setDoc,
} from "firebase/firestore";
import { useSnackbar } from "notistack";
import { db } from "@/config/firebase";
import useAuth from "../auth/useAuth";
import { DEFAULT_COMPANY } from "@/constants/auth";
import type { Material, MaterialData } from "@/types/firebase";

const useMaterials = () => {
  /** Values */

  const { enqueueSnackbar } = useSnackbar();
  const { company } = useAuth();

  const col = collection(
    db,
    `companies/${company?.id ?? DEFAULT_COMPANY.id}/materials`
  ).withConverter<MaterialData>({
    toFirestore: (material: MaterialData) => ({
      label: material.label.trim(),
      value: +material.value,
      description: material.description || "",
    }),
    fromFirestore: (snapshot, options): MaterialData =>
      snapshot.data(options) as MaterialData,
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
        if (!docSnap.exists()) throw new Error("Material does not exist");

        return docSnap;
      },
    });

  const list = (...constraints: QueryConstraint[]) =>
    queryOptions({
      queryKey: [col.id, "list", constraints] as const,
      queryFn: () => getDocs(query(col, ...constraints)),
    });

  /** Mutations */

  const create = useMutation({
    mutationKey: [col.id, "create"],
    mutationFn: (data: MaterialData) =>
      addDoc(col, {
        ...data,
        value: Number(data.value.toFixed(2)),
      }),
    onSuccess: (_, data) =>
      enqueueSnackbar(`'${data.label}' material created`, {
        variant: "success",
      }),
    onError: () =>
      enqueueSnackbar("Error creating material", {
        variant: "error",
      }),
  });

  const update = useMutation({
    mutationKey: [col.id, "update"],
    mutationFn: async ({ id, ...data }: Material) => {
      const docRef = doc(col, id);
      await setDoc(docRef, data);
    },
    onSuccess: (_, data) =>
      enqueueSnackbar(`'${data.label}' material updated`, {
        variant: "success",
      }),
    onError: () =>
      enqueueSnackbar("Error updating material", {
        variant: "error",
      }),
  });

  const archive = useMutation({
    mutationKey: [col.id, "archive"],
    mutationFn: async (data: string) => {
      const docRef = doc(col, data);
      await deleteDoc(docRef);
    },
    onSuccess: () =>
      enqueueSnackbar("Material deleted", {
        variant: "success",
      }),
    onError: () =>
      enqueueSnackbar("Error deleting material", {
        variant: "error",
      }),
  });

  return {
    collection: col,
    queries: { count, detail, list },
    mutations: { create, update, archive },
  };
};

export default useMaterials;
