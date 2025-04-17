import { useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import {
  Avatar,
  type AvatarProps,
  Box,
  type BoxProps,
  CircularProgress,
  IconButton,
  Skeleton,
  type IconButtonProps,
} from "@mui/material";
import {
  getDownloadURL,
  ref,
  type StorageError,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from "firebase/storage";

import { storage } from "@/config/firebase";
import { useSnackbar } from "notistack";
import { EMPTY_OBJECT } from "@/constants/utility";
import { sxAsArray } from "@/utils/sx";
import { getFileUploadMetadata } from "@/utils/file";

interface ThumbnailIconButtonProps extends Omit<IconButtonProps, "size"> {
  image?: string;
  size?: number;
  uploadFilePath?: string;
  onUploadStateChange?: (
    snapshot: UploadTaskSnapshot,
    progress: number
  ) => void;
  onUploadSuccess?: (snapshot: UploadTaskSnapshot, url: string) => void;
  onUploadError?: (error: StorageError) => void;
  slotProps?: {
    container?: BoxProps;
    avatar?: Omit<AvatarProps, "src">;
    dropzone?: Omit<DropzoneOptions, "onDrop" | "maxFiles" | "accept">;
  };
}

const ThumbnailIconButton = ({
  image,
  size = 120,
  disabled,
  uploadFilePath,
  onUploadSuccess,
  onUploadError,
  onUploadStateChange,
  slotProps: {
    avatar: avatarProps,
    container: containerProps,
    dropzone: dropzoneOptions,
  } = EMPTY_OBJECT,
}: ThumbnailIconButtonProps) => {
  const [uploadProgress, setUploadProgress] = useState(1);

  /** Values */

  const { enqueueSnackbar } = useSnackbar();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // 2MB
    disabled,
    ...dropzoneOptions,
    onDrop: (files) => {
      const file = files[0];
      const storageRef = ref(
        storage,
        uploadFilePath ?? `thumbnails/${crypto.randomUUID()}`
      );
      const metadata = getFileUploadMetadata(file);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setUploadProgress(progress);
          onUploadStateChange?.(snapshot, progress);
        },
        (error) => {
          enqueueSnackbar("Upload failed", { variant: "error" });
          setUploadProgress(1);
          onUploadError?.(error);
        },
        () => {
          enqueueSnackbar(
            `'${uploadTask.snapshot.metadata.customMetadata?.name ?? uploadTask.snapshot.ref.name}' successfully uploaded`
          );
          void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onUploadSuccess?.(uploadTask.snapshot, downloadURL);
          });
        }
      );
    },
  });

  const isUploading = uploadProgress < 1;

  return (
    <Box position="relative" {...containerProps}>
      <input type="hidden" {...getInputProps()} />
      <IconButton
        disabled={disabled || isUploading}
        {...getRootProps()}
        sx={{ p: 0 }}
      >
        <Avatar
          src={image ?? ""}
          {...avatarProps}
          sx={[
            {
              width: size,
              height: size,
              opacity: isDragActive ? 0.5 : 1,
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...sxAsArray(avatarProps?.sx),
          ]}
        />
      </IconButton>
      {isUploading && (
        <>
          <Skeleton
            variant="circular"
            width={size}
            height={size}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bgcolor: ({ palette }) => palette.grey[200],
              opacity: 0.5,
            }}
          />
          <CircularProgress
            size={size}
            thickness={3}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ThumbnailIconButton;
