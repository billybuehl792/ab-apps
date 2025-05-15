import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";

import materials from "@/lib/collections/firebase/materials";
import type { Material, MaterialData } from "@/types/firebase";

const useMaterials = () => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const create = useMutation({
    mutationKey: [materials.path, "create"],
    mutationFn: (data: MaterialData) =>
      addDoc(materials, {
        ...data,
        value: Number(data.value.toFixed(2)),
      }),
    onSuccess: async (_, data) => {
      await queryClient.invalidateQueries({ queryKey: [materials.path] });
      enqueueSnackbar(`'${data.label}' material created`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error creating material", {
        variant: "error",
      }),
  });

  const update = useMutation({
    mutationKey: [materials.path, "update"],
    mutationFn: async ({ id, ...data }: Material) => {
      const docRef = doc(materials, id);
      await setDoc(docRef, data);
    },
    onSuccess: async (_, data) => {
      await queryClient.invalidateQueries({ queryKey: [materials.path] });
      enqueueSnackbar(`'${data.label}' material updated`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error updating material", {
        variant: "error",
      }),
  });

  const archive = useMutation({
    mutationKey: [materials.path, "archive"],
    mutationFn: async (data: Material["id"]) => {
      const docRef = doc(materials, data);
      await deleteDoc(docRef);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [materials.path] });
      enqueueSnackbar("Material deleted", {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error deleting material", {
        variant: "error",
      }),
  });

  return { create, update, archive };
};

export default useMaterials;
