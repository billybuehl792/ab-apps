import { queryOptions } from "@tanstack/react-query";
import { getDownloadURL, type StorageReference } from "firebase/storage";

const downloadURL = (ref: StorageReference) =>
  queryOptions({
    queryKey: [...storageQueries().queryKey, "downloadURL"],
    queryFn: () => getDownloadURL(ref),
  });

export const storageQueries = Object.assign(
  () => ({ queryKey: ["storage"] as const }),
  { downloadURL }
);
