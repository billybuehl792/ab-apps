import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { UserFormValues } from "../types";

const MAX_LENGTH = 32;

const UserFormDisplayNameField = (props: TextFieldProps) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<UserFormValues>();

  return (
    <TextField
      label="Display Name"
      error={Boolean(errors.displayName)}
      helperText={errors.displayName?.message}
      fullWidth
      {...register("displayName", {
        required: "Display name is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default UserFormDisplayNameField;
