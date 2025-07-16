import { type FormEventHandler, type ComponentProps, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, useMediaQuery } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { type User } from "firebase/auth";
import { type UserRecord } from "firebase-admin/auth";
import useUsers from "@/hooks/useUsers";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import UserPermissionsFormDrawerRoleField from "./fields/UserPermissionsFormDrawerRoleField";
import type { Permissions } from "@/store/types/auth";
import { AuthRole } from "@/store/enums/auth";

interface UserPermissionsFormDrawerProps
  extends ComponentProps<typeof SwipeableDrawer> {
  user: User | UserRecord | string;
}

const UserPermissionsFormDrawer = ({
  user,
  onClose,
  ...props
}: UserPermissionsFormDrawerProps) => {
  /** Values */

  const isMobile = useMediaQuery("(pointer: coarse)");
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const users = useUsers();

  const userId = typeof user === "string" ? user : user.uid;

  /** Form */

  const methods = useForm<Permissions>({
    defaultValues: { role: AuthRole.STANDARD },
  });

  /** Queries */

  const userPermissionsQuery = useQuery(users.queries.permissions(userId));

  /** Callbacks */

  const handleSubmit = methods.handleSubmit((data) => {
    if (data.role === userPermissionsQuery.data?.role) handleOnClose();
    else
      users.mutations.updatePermissions.mutate(
        { id: userId, permissions: data },
        { onSuccess: handleOnClose }
      );
  }) as FormEventHandler;

  const handleReset: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const handleOnClose = () => {
    methods.reset();
    onClose?.();
  };

  /** Effects */

  useEffect(() => {
    methods.reset(userPermissionsQuery.data);
  }, [methods, userPermissionsQuery.data]);

  return (
    <SwipeableDrawer
      title="Permissions"
      anchor={isMobile || !isSm ? "bottom" : "right"}
      onClose={handleOnClose}
      {...props}
      slotProps={{ content: { minWidth: 300 }, ...props.slotProps }}
    >
      <FormProvider {...methods}>
        <Stack
          component="form"
          noValidate
          flexGrow={1}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Stack flexGrow={1} p={2}>
            <UserPermissionsFormDrawerRoleField />
          </Stack>
          <Stack
            position="sticky"
            bottom={0}
            spacing={1}
            p={2}
            pt={0}
            bgcolor={({ palette }) => palette.background.paper}
          >
            <Button
              type="submit"
              loading={users.mutations.updatePermissions.isPending}
              disabled={methods.formState.disabled}
            >
              Submit
            </Button>
            <Button type="reset" variant="text" color="error">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </SwipeableDrawer>
  );
};

export default UserPermissionsFormDrawer;
