import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { ClientData } from "@/types/firebase";

const MAX_LENGTH = 32;

const ClientFormLastNameField: FC<TextFieldProps> = (props) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<ClientData>();

  return (
    <TextField
      label="Last Name"
      error={Boolean(errors.last_name)}
      helperText={errors.last_name?.message}
      fullWidth
      {...register("last_name", {
        required: "Last name is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${MAX_LENGTH}`,
        },
      })}
      {...props}
    />
  );
};

export default ClientFormLastNameField;
