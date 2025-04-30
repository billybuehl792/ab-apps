import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { MaterialFormValues } from "../types";

const MAX_LENGTH = 128;

const MaterialFormDescriptionField = (props: TextFieldProps) => {
  /** Values */

  const methods = useFormContext<MaterialFormValues>();

  return (
    <TextField
      label="Description"
      fullWidth
      error={!!methods.formState.errors.description}
      helperText={methods.formState.errors.description?.message}
      {...methods.register("description", {
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default MaterialFormDescriptionField;
