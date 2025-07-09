import { type FormEventHandler, type ComponentProps } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  Controller,
  FormProvider,
  useForm,
  type UseFormProps,
} from "react-hook-form";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import { AuthRole } from "@/store/enums/auth";
import type { Permissions } from "@/store/types/auth";

interface UserPermissionsFormDrawerProps
  extends Omit<ComponentProps<typeof SwipeableDrawer>, "onSubmit">,
    UseFormProps<Permissions> {
  onSubmit: (data: Permissions) => void;
}

const UserPermissionsFormDrawer = ({
  onSubmit,
  onClose,
  ...props
}: UserPermissionsFormDrawerProps) => {
  /** Values */

  const isMobile = useMediaQuery("(pointer: coarse)");
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  /** Form */

  const methods = useForm<Permissions>(props);

  /** Callbacks */

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit(data);
  }) as FormEventHandler;

  const handleReset: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const handleOnClose = () => {
    methods.reset();
    onClose?.();
  };

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
            <Controller
              name="role"
              control={methods.control}
              rules={{ required: "Role is required" }}
              render={({ field, formState }) => (
                <FormControl error={Boolean(formState.errors.role)}>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup {...field}>
                    {Object.values(AuthRole).map((role) => (
                      <FormControlLabel
                        key={role}
                        value={role}
                        control={<Radio />}
                        label={role.toCapitalized()}
                      />
                    ))}
                  </RadioGroup>
                  {!!formState.errors.role && (
                    <FormHelperText error>
                      {formState.errors.role.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
          <Stack
            position="sticky"
            bottom={0}
            spacing={1}
            p={2}
            pt={0}
            bgcolor="background.paper"
          >
            <Button
              type="submit"
              loading={methods.formState.isSubmitting}
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
