import { mutationOptions } from "@tanstack/react-query";
import {
  ref,
  type StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase";
import { storageQueries } from "../queries/storage";
import { fileUtils } from "../utils/file";

const uploadFile = () =>
  mutationOptions({
    mutationKey: [...storageQueries().queryKey, "uploadFile"] as const,
    mutationFn: async (body: {
      path: string;
      file: File;
      onProgressUpdate?: (progress: number) => void;
    }) => {
      return new Promise<StorageReference>((resolve, reject) => {
        const storageRef = ref(storage, body.path);
        const metadata = fileUtils.getFileUploadMetadata(body.file);
        const uploadTask = uploadBytesResumable(
          storageRef,
          body.file,
          metadata
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            body.onProgressUpdate?.(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve(uploadTask.snapshot.ref);
          }
        );
      });
    },
  });

export const storageMutations = {
  uploadFile,
};
