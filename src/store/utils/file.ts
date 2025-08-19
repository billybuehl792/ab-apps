import { type UploadMetadata } from "firebase/storage";

/**
 * A helper function to extract `Metadata` from a `File` object.
 * @param file - `File` object to extract metadata from
 */
const getFileUploadMetadata = (file: File): UploadMetadata => {
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

/**
 * Returns converted size in Bytes to KB, MB, or GB
 */
export const formatBytes = (bytes: number, decimals = 1) => {
  if (!bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${String(parseFloat((bytes / k ** i).toFixed(dm)))} ${sizes[i]}`;
};

export const fileUtils = {
  getFileUploadMetadata,
  formatBytes,
};
