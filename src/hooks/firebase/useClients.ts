import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";

import clientCollection from "@/lib/collections/firebase/clientCollection";
import type { Client, ClientData } from "@/types/firebase";

const useClients = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const create = useMutation({
    mutationKey: [clientCollection.path, "create"],
    mutationFn: (data: ClientData) => addDoc(clientCollection, data),
    onSuccess: (_, data) => {
      enqueueSnackbar(`'${data.first_name} ${data.last_name}' client created`, {
        variant: "success",
      });
      void queryClient.invalidateQueries({ queryKey: [clientCollection.path] });
    },
    onError: () =>
      enqueueSnackbar("Error creating client", { variant: "error" }),
  });

  const update = useMutation({
    mutationKey: [clientCollection.path, "update"],
    mutationFn: async ({ id, ...data }: Client) => {
      const docRef = doc(clientCollection, id);
      await setDoc(docRef, { ...data });
    },
    onSuccess: (_, data) => {
      enqueueSnackbar(`'${data.first_name} ${data.last_name}' client updated`, {
        variant: "success",
      });
      void queryClient.invalidateQueries({ queryKey: [clientCollection.path] });
    },
    onError: () =>
      enqueueSnackbar("Error updating client", {
        variant: "error",
      }),
  });

  const archive = useMutation({
    mutationKey: [clientCollection.path, "archive"],
    mutationFn: async (id: Client["id"]) => {
      const docRef = doc(clientCollection, id);
      await updateDoc(docRef, { archived: true });
    },
    onSuccess: () => {
      enqueueSnackbar("Client deleted", { variant: "success" });
      void queryClient.invalidateQueries({ queryKey: [clientCollection.path] });
    },
    onError: () =>
      enqueueSnackbar("Error deleting client", { variant: "error" }),
  });

  const unarchive = useMutation({
    mutationKey: [clientCollection.path, "unarchive"],
    mutationFn: async (id: Client["id"]) => {
      const docRef = doc(clientCollection, id);
      await updateDoc(docRef, { archived: false });
    },
    onSuccess: () => {
      enqueueSnackbar("Client restored", { variant: "success" });
      void queryClient.invalidateQueries({ queryKey: [clientCollection.path] });
    },
    onError: () =>
      enqueueSnackbar("Error restoring client", { variant: "error" }),
  });

  return { create, update, archive, unarchive };
};

export default useClients;
