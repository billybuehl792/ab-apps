import { UploadMetadata } from "firebase/storage";

/**
 * A helper function to extract `Metadata` from a `File` object.
 * @param file - `File` object to extract metadata from
 */
export const getFileUploadMetadata = (file: File): UploadMetadata => {
  return {
    contentType: file.type,
    customMetadata: {
      name: file.name,
      size: file.size.toString(),
      type: file.type,
      lastModified: file.lastModified.toString(),
    },
  };
};
