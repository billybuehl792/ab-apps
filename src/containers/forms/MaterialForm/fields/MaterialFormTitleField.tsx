import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { MaterialData } from "@/firebase/types";

const MAX_LENGTH = 128;

const MaterialFormTitleField: FC<TextFieldProps> = () => {
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
          message: `Max length is ${MAX_LENGTH}`,
        },
      })}
    />
  );
};

export default MaterialFormTitleField;
