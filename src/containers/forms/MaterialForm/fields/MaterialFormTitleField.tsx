import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { MaterialData } from "@/types/firebase";

const MAX_LENGTH = 128;

const MaterialFormTitleField: FC<TextFieldProps> = (props) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<MaterialData>();

  return (
    <TextField
      label="Title"
      fullWidth
      error={!!errors.label}
      helperText={errors.label?.message}
      {...register("label", {
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
