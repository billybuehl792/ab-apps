import { type ComponentProps, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StorageReference } from "firebase/storage";
import { useSnackbar } from "notistack";
import { type User } from "firebase/auth";
import useStorage from "@/store/hooks/useStorage";
import useUsers from "@/store/hooks/useUsers";
import AvatarDropzone from "../AvatarDropzone";
import { storageQueries } from "@/store/queries/storage";

interface UserAvatarUploadIconButtonProps
  extends ComponentProps<typeof AvatarDropzone> {
  user: User;
}

const UserAvatarUploadIconButton = ({
  user,
  ...props
}: UserAvatarUploadIconButtonProps) => {
  const [uploadProgress, setUploadProgress] = useState(1);

  /** Values */

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const users = useUsers();
  const storage = useStorage();

  /** Callbacks */

  const handleOnDropAccepted: ComponentProps<
    typeof AvatarDropzone
  >["onDropAccepted"] = (acceptedFiles) => {
    storage.mutations.uploadFile.mutate(
      {
        path: `avatars/${user.uid}`,
        file: acceptedFiles[0],
        onProgressUpdate: setUploadProgress,
      },
      { onSuccess: handleFileUploaded }
    );
  };

  const handleFileUploaded = (ref: StorageReference) => {
    setUploadProgress(1);
    queryClient
      .fetchQuery(storageQueries.downloadURL(ref))
      .then((photoUrl) => {
        users.mutations.updateUserProfile.mutate(
          { user, photoUrl },
          { onSuccess: () => void user.reload() }
        );
      })
      .catch(() =>
        snackbar.enqueueSnackbar("Error retrieving photoUrl", {
          variant: "error",
        })
      );
  };

  return (
    <AvatarDropzone
      src={user.photoURL ?? undefined}
      alt={user.displayName ?? undefined}
      loading={uploadProgress < 1 ? uploadProgress : false}
      onDropAccepted={handleOnDropAccepted}
      {...props}
    />
  );
};

export default UserAvatarUploadIconButton;
