import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { storageMutations } from "../mutations/storage";
import { storageQueries } from "../queries/storage";

const useStorage = () => {
  /** Values */

  const snackbar = useSnackbar();

  /** Mutations */

  const uploadFile = useMutation({
    ...storageMutations.uploadFile(),
    onSuccess: () =>
      snackbar.enqueueSnackbar("File uploaded successfully!", {
        variant: "success",
      }),
    onError: () =>
      snackbar.enqueueSnackbar("Error uploading file", { variant: "error" }),
  });

  return {
    queries: storageQueries,
    mutations: { uploadFile },
  };
};

export default useStorage;
