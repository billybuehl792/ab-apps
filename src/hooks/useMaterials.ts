import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import useAuth from "./useAuth";
import { materialQueries } from "@/store/queries/materials";
import { materialMutations } from "@/store/mutations/materials";
import { FirebaseCollection } from "@/store/enums/firebase";
import { markdownUtils } from "@/store/utils/markdown";
import type { Company } from "@/store/types/companies";
import type { QueryParams } from "@/store/types/queries";

const useMaterials = (company?: Company | string) => {
  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();

  const companyId =
    typeof company === "string" ? company : (company?.id ?? auth.company.id);

  /** Queries */

  const count = (params?: QueryParams) =>
    materialQueries.count(companyId, params);

  const detail = (id: string) => materialQueries.detail(companyId, id);

  const list = (params?: QueryParams) =>
    materialQueries.list(companyId, params);

  /** Mutations */

  const create = useMutation({
    ...materialMutations.create(companyId),
    onSuccess: (_, data) => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.MATERIALS, companyId],
      });
      void enqueueSnackbar(
        `${markdownUtils.bold(data.label)} material created`,
        { variant: "success" }
      );
    },
    onError: () =>
      enqueueSnackbar("Error creating material", { variant: "error" }),
  });

  const update = useMutation({
    ...materialMutations.update(companyId),
    onSuccess: (_, data) => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.MATERIALS, companyId],
      });
      void enqueueSnackbar(`${markdownUtils.bold(data.label)} updated`, {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Error updating material", {
        variant: "error",
      }),
  });

  const remove = useMutation({
    ...materialMutations.remove(companyId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.MATERIALS, companyId],
      });
      void enqueueSnackbar("Material deleted", { variant: "success" });
    },
    onError: () =>
      enqueueSnackbar("Error deleting material", { variant: "error" }),
  });

  return {
    queries: { count, detail, list },
    mutations: { create, update, remove },
  };
};

export default useMaterials;
