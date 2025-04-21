import { type ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText, Stack, type StackProps } from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import ThumbnailIconButton from "@/components/buttons/ThumbnailIconButton";
import type { UserFormValues } from "../types";

const UserFormPhotoUrlField = (props: StackProps) => {
  /** Values */

  const { user } = useAuth();
  const { setError, setValue, control } = useFormContext<UserFormValues>();

  /** Callbacks */

  const onUploadSuccess: ComponentProps<
    typeof ThumbnailIconButton
  >["onUploadSuccess"] = (_snapshot, url) => {
    setValue("photoURL", url, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onUploadError: ComponentProps<
    typeof ThumbnailIconButton
  >["onUploadError"] = (error) => {
    setError("photoURL", { message: error.message });
  };

  if (!user) return null;
  return (
    <Controller
      name="photoURL"
      control={control}
      rules={{ required: "Photo URL is required" }}
      render={({ field: { value }, formState: { errors } }) => (
        <Stack spacing={1} {...props}>
          <Stack direction="row" justifyContent="center">
            <ThumbnailIconButton
              image={value ?? ""}
              uploadFilePath={`avatars/${user.uid}/temp`}
              onUploadSuccess={onUploadSuccess}
              onUploadError={onUploadError}
            />
          </Stack>
          {!!errors.photoURL && (
            <FormHelperText error sx={{ textAlign: "center" }}>
              {errors.photoURL.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};

export default UserFormPhotoUrlField;
