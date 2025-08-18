import { mutationOptions } from "@tanstack/react-query";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseUtils } from "../utils/firebase";
import { FirebaseCollection } from "../enums/firebase";
import { MutationVariant } from "../enums/queries";
import type { Client } from "../types/clients";

const create = (companyId: string) =>
  mutationOptions({
    mutationKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      MutationVariant.CREATE,
    ] as const,
    mutationFn: (data: Omit<Client, "id">) =>
      addDoc(firebaseUtils.collections.getClientCollection(companyId), data),
  });

const update = (companyId: string) =>
  mutationOptions({
    mutationKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      MutationVariant.UPDATE,
    ] as const,
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
    mutationKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      MutationVariant.ARCHIVE,
    ] as const,
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
    mutationKey: [
      FirebaseCollection.CLIENTS,
      companyId,
      MutationVariant.RESTORE,
    ] as const,
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
