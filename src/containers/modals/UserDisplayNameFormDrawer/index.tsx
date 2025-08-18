import { type FormEventHandler, type ComponentProps, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { type User } from "firebase/auth";
import { profileMutations } from "@/store/mutations/profile";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";

interface UserDisplayNameForm {
  displayName: string;
}

interface UserDisplayNameFormDrawerProps
  extends ComponentProps<typeof SwipeableDrawer> {
  user: User;
}

const MAX_LENGTH = 24;

const UserDisplayNameFormDrawer = ({
  user,
  onClose,
  ...props
}: UserDisplayNameFormDrawerProps) => {
  /** Values */

  const router = useRouter();
  const isMobile = useMediaQuery("(pointer: coarse)");
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  /** Mutations */

  const updateDisplayNameMutation = useMutation(
    profileMutations.updateProfile()
  );

  /** Form */

  const methods = useForm<UserDisplayNameForm>();

  /** Callbacks */

  const handleSubmit = methods.handleSubmit((data) => {
    updateDisplayNameMutation.mutate(
      { user, ...data },
      {
        onSuccess: () => {
          void user.getIdToken(true);
          void router.invalidate();
          onClose?.();
        },
      }
    );
  }) as FormEventHandler;

  const handleReset: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onClose?.();
  };

  /** Effects */

  useEffect(() => {
    methods.reset({ displayName: user.displayName ?? "" });
  }, [methods, user]);

  return (
    <SwipeableDrawer
      title={user.displayName ?? "User Display Name"}
      anchor={isMobile || !isSm ? "bottom" : "right"}
      onClose={onClose}
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
            <TextField
              label="Display Name"
              required
              error={Boolean(methods.formState.errors.displayName)}
              helperText={methods.formState.errors.displayName?.message}
              {...methods.register("displayName", {
                required: "Display Name is required",
                maxLength: {
                  value: MAX_LENGTH,
                  message: `Max length is ${String(MAX_LENGTH)}`,
                },
              })}
            />
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
              loading={updateDisplayNameMutation.isPending}
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

export default UserDisplayNameFormDrawer;
