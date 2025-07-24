import { mutationOptions } from "@tanstack/react-query";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firebaseUtils } from "../utils/firebase";
import { FirebaseCollection } from "../enums/firebase";
import { MutationVariant } from "../enums/queries";
import { Material } from "../types/materials";

const create = (companyId: string) =>
  mutationOptions({
    mutationKey: [
      FirebaseCollection.MATERIALS,
      companyId,
      MutationVariant.CREATE,
    ] as const,
    mutationFn: (data: Omit<Material, "id">) =>
      addDoc(firebaseUtils.collections.getMaterialCollection(companyId), data),
  });

const update = (companyId: string) =>
  mutationOptions({
    mutationKey: [
      FirebaseCollection.MATERIALS,
      companyId,
      MutationVariant.UPDATE,
    ] as const,
    mutationFn: async ({ id, ...data }: Material) => {
      const docRef = doc(
        firebaseUtils.collections.getMaterialCollection(companyId),
        id
      );
      await setDoc(docRef, data);
    },
  });

const remove = (companyId: string) =>
  mutationOptions({
    mutationKey: [
      FirebaseCollection.MATERIALS,
      companyId,
      MutationVariant.REMOVE,
    ] as const,
    mutationFn: async (id: string) => {
      const docRef = doc(
        firebaseUtils.collections.getMaterialCollection(companyId),
        id
      );
      await deleteDoc(docRef);
    },
  });

export const materialMutations = {
  create,
  update,
  remove,
};
