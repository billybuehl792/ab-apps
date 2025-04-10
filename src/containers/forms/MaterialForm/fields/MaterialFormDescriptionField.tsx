import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { MaterialData } from "@/types/firebase";

const MAX_LENGTH = 128;

const MaterialFormDescriptionField: FC<TextFieldProps> = (props) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<MaterialData>();

  return (
    <TextField
      label="Description"
      fullWidth
      error={!!errors.description}
      helperText={errors.description?.message}
      {...register("description", {
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${MAX_LENGTH}`,
        },
      })}
      {...props}
    />
  );
};

export default MaterialFormDescriptionField;
