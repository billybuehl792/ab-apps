import { type ComponentProps } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Stack } from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import UserForm from "@/containers/forms/UserForm";
import useProfile from "@/hooks/firebase/useProfile";
import {
  ref,
  uploadBytesResumable,
  getBlob,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/config/firebase";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      redirect({
        to: "/sign-in",
        search: { redirect: location.href },
        throw: true,
      });
  },
});

function RouteComponent() {
  /** Values */

  const { user } = useAuth();
  const { update } = useProfile();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof UserForm>["onSubmit"] = async (
    data
  ) => {
    if (!user) throw new Error("User not found");

    let photoURL = data.photoURL;
    if (data.photoURL) {
      const currentRef = ref(storage, data.photoURL);
      if (currentRef.name === "temp") {
        const newStorageRef = ref(storage, `avatars/${user.uid}/avatar`);
        const imageData = await getBlob(currentRef);
        await uploadBytesResumable(newStorageRef, imageData);
        photoURL = await getDownloadURL(newStorageRef);
        await deleteObject(currentRef);
      }
    }

    await update.mutateAsync({ user, data: { ...data, photoURL } });
  };

  return (
    <Stack p={2}>
      <UserForm
        values={{
          displayName: user?.displayName ?? "",
          photoURL: user?.photoURL ?? "",
        }}
        slotProps={{ actions: { submitLabel: "Update" } }}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
