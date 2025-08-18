import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import { ClientForm } from "..";

const MAX_LENGTH = 32;

const ClientFormLastNameField = (props: TextFieldProps) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<ClientForm>();

  return (
    <TextField
      label="Last Name"
      required
      error={Boolean(errors.last_name)}
      helperText={errors.last_name?.message}
      fullWidth
      {...register("last_name", {
        required: "Last name is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default ClientFormLastNameField;
