import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { clientCollection, materialCollection } from "./collections";
import type { Client, ClientData, Material, MaterialData } from "./types";

const useClientMutations = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const create = useMutation({
    mutationKey: [clientCollection.id, "create"],
    mutationFn: (data: ClientData) => addDoc(clientCollection, data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: [clientCollection.id] });
      enqueueSnackbar(`Client created: ${data.first_name} ${data.last_name}`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error while creating client", {
        variant: "error",
      }),
  });

  const update = useMutation({
    mutationKey: [clientCollection.id, "update"],
    mutationFn: async (data: Client) => {
      const docRef = doc(clientCollection, data.id);
      await updateDoc(docRef, { ...data });
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: [clientCollection.id] });
      enqueueSnackbar(`Client updated: ${data.first_name} ${data.last_name}`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error while updating client", {
        variant: "error",
      }),
  });

  const remove = useMutation({
    mutationKey: [clientCollection.id, "delete"],
    mutationFn: async (data: Client["id"]) => {
      const docRef = doc(clientCollection, data);
      await deleteDoc(docRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [clientCollection.id] });
      enqueueSnackbar("Client deleted", {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error while deleting client", {
        variant: "error",
      }),
  });

  return { create, update, remove };
};

const useMaterialMutations = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const create = useMutation({
    mutationKey: [materialCollection.id, "create"],
    mutationFn: (data: MaterialData) =>
      addDoc(materialCollection, { ...data, value: +data.value }),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: [materialCollection.id] });
      enqueueSnackbar(`Material created: ${data.label}`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error while creating material", {
        variant: "error",
      }),
  });

  const update = useMutation({
    mutationKey: [materialCollection.id, "update"],
    mutationFn: async (data: Material) => {
      const docRef = doc(materialCollection, data.id);
      await updateDoc(docRef, { ...data, value: +data.value });
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: [materialCollection.id] });
      enqueueSnackbar(`Material updated: ${data.label}`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error while updating material", {
        variant: "error",
      }),
  });

  const remove = useMutation({
    mutationKey: [materialCollection.id, "delete"],
    mutationFn: async (data: Material["id"]) => {
      const docRef = doc(materialCollection, data);
      await deleteDoc(docRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [materialCollection.id] });
      enqueueSnackbar("Material deleted", {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error while deleting material", {
        variant: "error",
      }),
  });

  return { create, update, remove };
};

export const firestoreMutations = { useClientMutations, useMaterialMutations };
