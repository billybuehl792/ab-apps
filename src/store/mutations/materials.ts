import { mutationOptions } from "@tanstack/react-query";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firebaseUtils } from "../utils/firebase";
import { materialQueries } from "../queries/materials";
import type { Material } from "../types/materials";

const create = (companyId: string) =>
  mutationOptions({
    mutationKey: [...materialQueries(companyId).queryKey, "create"] as const,
    mutationFn: (data: Omit<Material, "id">) =>
      addDoc(firebaseUtils.collections.getMaterialCollection(companyId), data),
  });

const update = (companyId: string) =>
  mutationOptions({
    mutationKey: [...materialQueries(companyId).queryKey, "update"] as const,
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
    mutationKey: [...materialQueries(companyId).queryKey, "remove"] as const,
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
