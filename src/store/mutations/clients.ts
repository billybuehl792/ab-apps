import { mutationOptions } from "@tanstack/react-query";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseUtils } from "../utils/firebase";
import { clientQueries } from "../queries/clients";
import type { Client } from "../types/clients";

const create = (companyId: string) =>
  mutationOptions({
    mutationKey: [...clientQueries(companyId).queryKey, "create"] as const,
    mutationFn: (data: Omit<Client, "id">) =>
      addDoc(firebaseUtils.collections.getClientCollection(companyId), data),
  });

const update = (companyId: string) =>
  mutationOptions({
    mutationKey: [...clientQueries(companyId).queryKey, "update"] as const,
    mutationFn: async ({ id, ...data }: Client) => {
      const docRef = doc(
        firebaseUtils.collections.getClientCollection(companyId),
        id
      );
      await setDoc(docRef, data);
    },
  });

const archive = (companyId: string) =>
  mutationOptions({
    mutationKey: [...clientQueries(companyId).queryKey, "archive"] as const,
    mutationFn: async (id: string) => {
      const docRef = doc(
        firebaseUtils.collections.getClientCollection(companyId),
        id
      );
      await updateDoc(docRef, { archived: true });
    },
  });

const restore = (companyId: string) =>
  mutationOptions({
    mutationKey: [...clientQueries(companyId).queryKey, "restore"] as const,
    mutationFn: async (id: string) => {
      const docRef = doc(
        firebaseUtils.collections.getClientCollection(companyId),
        id
      );
      await updateDoc(docRef, { archived: false });
    },
  });

export const clientMutations = {
  create,
  update,
  archive,
  restore,
};
