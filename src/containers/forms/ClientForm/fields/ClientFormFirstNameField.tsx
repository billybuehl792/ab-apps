import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

import type { ClientFormValues } from "../types";

const MAX_LENGTH = 32;

const ClientFormFirstNameField = (props: TextFieldProps) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<ClientFormValues>();

  return (
    <TextField
      label="First Name"
      error={Boolean(errors.first_name)}
      helperText={errors.first_name?.message}
      fullWidth
      {...register("first_name", {
        required: "First name is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default ClientFormFirstNameField;
