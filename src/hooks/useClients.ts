import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import useAuth from "./useAuth";
import { clientQueries } from "@/store/queries/clients";
import { clientMutations } from "@/store/mutations/clients";
import { markdownUtils } from "@/store/utils/markdown";
import { FirebaseCollection } from "@/store/enums/firebase";
import type { Company } from "@/store/types/companies";
import type { QueryParams } from "@/store/types/queries";

const useClients = (company?: Company | string) => {
  /** Values */

  const queryClient = useQueryClient();
  const auth = useAuth();
  const snackbar = useSnackbar();

  const companyId =
    typeof company === "string" ? company : (company?.id ?? auth.company.id);

  /** Queries */

  const count = (params?: QueryParams) =>
    clientQueries.count(companyId, params);

  const detail = (id: string) => clientQueries.detail(companyId, id);

  const list = (params?: QueryParams) => clientQueries.list(companyId, params);

  const search = (term?: string) => clientQueries.search(companyId, term);

  /** Mutations */

  const create = useMutation({
    ...clientMutations.create(companyId),
    onSuccess: (_, data) => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.CLIENTS, companyId],
      });
      void snackbar.enqueueSnackbar(
        `${markdownUtils.bold(data.first_name + " " + data.last_name)} client created`,
        { variant: "success" }
      );
    },
    onError: () =>
      snackbar.enqueueSnackbar("Error creating client", { variant: "error" }),
  });

  const update = useMutation({
    ...clientMutations.update(companyId),
    onSuccess: (_, data) => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.CLIENTS, companyId],
      });
      void snackbar.enqueueSnackbar(
        `${markdownUtils.bold(data.first_name + " " + data.last_name)} updated`,
        { variant: "success" }
      );
    },
    onError: () =>
      snackbar.enqueueSnackbar("Error updating client", {
        variant: "error",
      }),
  });

  const archive = useMutation({
    ...clientMutations.archive(companyId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.CLIENTS, companyId],
      });
      void snackbar.enqueueSnackbar("Client archived", { variant: "success" });
    },
    onError: () =>
      snackbar.enqueueSnackbar("Error archiving client", { variant: "error" }),
  });

  const restore = useMutation({
    ...clientMutations.restore(companyId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FirebaseCollection.CLIENTS, companyId],
      });
      void snackbar.enqueueSnackbar("Client restored", { variant: "success" });
    },
    onError: () =>
      snackbar.enqueueSnackbar("Error restoring client", { variant: "error" }),
  });

  return {
    queries: { count, detail, list, search },
    mutations: { create, update, archive, restore },
  };
};

export default useClients;
