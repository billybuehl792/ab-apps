import { type ComponentProps, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProfile, type User } from "firebase/auth";
import { useSnackbar } from "notistack";
import { Stack, type StackProps, Typography } from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import EditIconButton from "@/components/buttons/EditIconButton";
import UserDisplayNameFormDrawer from "@/containers/modals/UserDisplayNameFormDrawer";
import UserDisplayNameForm from "@/containers/forms/UserDisplayNameForm";

interface UserDetailCardDisplayNameProps extends StackProps {
  user: User;
  disabled?: boolean;
}

const UserDetailCardDisplayName = ({
  user,
  disabled: disabledProp,
  ...props
}: UserDetailCardDisplayNameProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { user: currentUser } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const disabled = disabledProp || currentUser?.uid !== user.uid;

  /** Mutations */

  const updateUserDisplayName = useMutation({
    mutationKey: ["updateUserDisplayName", user.uid],
    mutationFn: (value: string) =>
      updateProfile(user, { displayName: value.trim() }),
    onSuccess: () => {
      enqueueSnackbar("Display name updated", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  /** Callbacks */

  const handleToggleModalOpen = () => {
    setModalOpen((value) => !value);
  };

  const onSubmit: ComponentProps<
    typeof UserDisplayNameForm
  >["onSubmit"] = async (data) => {
    await updateUserDisplayName.mutateAsync(data.displayName);
  };

  const onSuccess: ComponentProps<
    typeof UserDisplayNameForm
  >["onSuccess"] = () => {
    void currentUser?.reload();
    setModalOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        color="white"
        {...props}
      >
        <Typography variant="h6" fontWeight={600}>
          {user.displayName ?? "Display Name"}
        </Typography>
        <EditIconButton
          size="small"
          color="inherit"
          active={modalOpen}
          disabled={disabled}
          onClick={handleToggleModalOpen}
        />
      </Stack>

      {/* Modals */}
      <UserDisplayNameFormDrawer
        open={modalOpen}
        slotProps={{
          form: {
            values: { displayName: user.displayName ?? "" },
            slotProps: {
              actions: {
                submitLabel: "Update",
                resetAsCancel: true,
              },
            },
            onSubmit,
            onSuccess,
            onReset: handleToggleModalOpen,
          },
        }}
        onClose={handleToggleModalOpen}
      />
    </>
  );
};

export default UserDetailCardDisplayName;
