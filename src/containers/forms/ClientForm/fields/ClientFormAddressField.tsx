import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { ClientData } from "@/firebase/types";

const MAX_LENGTH = 128;

const ClientFormAddressField: FC<TextFieldProps> = (props) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<ClientData>();

  return (
    <TextField
      label="Address"
      error={Boolean(errors.address)}
      helperText={errors.address?.message}
      {...register("address", {
        required: "Address is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${MAX_LENGTH}`,
        },
      })}
      {...props}
    />
  );
};

export default ClientFormAddressField;
