import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Avatar,
  Box,
  type BoxProps,
  CircularProgress,
  IconButton,
  Skeleton,
} from "@mui/material";
import {
  getDownloadURL,
  ref,
  StorageError,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "@/config/firebase";
import { useSnackbar } from "notistack";
import { type User, updateProfile } from "firebase/auth";
import { getFileUploadMetadata } from "@/utils/file";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import useAuth from "@/hooks/auth/useAuth";

interface UserAvatarUploadIconButtonProps extends BoxProps {
  user: User;
  disabled?: boolean;
  size?: number;
}

const UserAvatarUploadIconButton = ({
  user,
  disabled: disabledProp,
  size = 60,
  ...props
}: UserAvatarUploadIconButtonProps) => {
  const [uploadProgress, setUploadProgress] = useState(1);

  /** Values */

  const { user: currentUser } = useAuth();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const disabled = disabledProp || currentUser?.uid !== user.uid;

  /** Mutations */

  const updateUserAvatar = useMutation({
    mutationKey: ["updateUserAvatar", user.uid],
    mutationFn: async (data: StorageReference) => {
      const photoURL = await getDownloadURL(data);
      await updateProfile(user, { photoURL });
      await router.invalidate();
    },
    onSuccess: () => {
      enqueueSnackbar("Avatar updated", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  /** Callbacks */

  const handleUploadSuccess = (data: StorageReference) => {
    updateUserAvatar.mutate(data);
    setUploadProgress(1);
  };

  const handleUploadError = (error?: StorageError) => {
    enqueueSnackbar(
      error?.message ?? "Something went wrong while uploading image...",
      { variant: "error" }
    );
    setUploadProgress(1);
  };

  /** Dropzone */

  const dropzone = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    minSize: 1024, // 1KB
    maxSize: 1024 * 1024, // 1MB
    disabled,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];

      try {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        const metadata = getFileUploadMetadata(file);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setUploadProgress(snapshot.bytesTransferred / snapshot.totalBytes);
          },
          (error) => {
            handleUploadError(error);
          },
          () => {
            handleUploadSuccess(uploadTask.snapshot.ref);
          }
        );
      } catch (_error) {
        handleUploadError();
      }
    },
    onDropRejected: (rejections) => {
      enqueueSnackbar(rejections[0].errors[0].message, { variant: "error" });
    },
  });

  const isUploading = uploadProgress < 1;

  return (
    <Box position="relative" {...props}>
      <input type="hidden" {...dropzone.getInputProps()} />
      <IconButton
        disabled={disabled || isUploading}
        {...dropzone.getRootProps()}
      >
        {isUploading ? (
          <Box position="relative">
            <Skeleton
              variant="circular"
              width={size}
              height={size}
              sx={{
                opacity: 0.5,
                transform: "scale(0.9)",
                bgcolor: ({ palette }) => palette.grey[200],
              }}
            />
            <CircularProgress
              variant="determinate"
              value={uploadProgress * 100}
              size={size}
              thickness={5}
              color="info"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          </Box>
        ) : (
          <Avatar
            src={user.photoURL ?? ""}
            sx={{
              width: size,
              height: size,
              opacity: dropzone.isDragActive ? 0.5 : 1,
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default UserAvatarUploadIconButton;
