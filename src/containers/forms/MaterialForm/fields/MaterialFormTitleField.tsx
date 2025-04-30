import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { MaterialFormValues } from "../types";

const MAX_LENGTH = 128;

const MaterialFormTitleField = (props: TextFieldProps) => {
  /** Values */

  const methods = useFormContext<MaterialFormValues>();

  return (
    <TextField
      label="Title"
      fullWidth
      error={!!methods.formState.errors.label}
      helperText={methods.formState.errors.label?.message}
      {...methods.register("label", {
        required: "Title is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default MaterialFormTitleField;
