import { type FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import { type TextFieldProps } from "@mui/material";
import { validateAddress } from "@/lib/queries/google-maps";
import AddressField from "@/components/fields/AddressField";
import type { ClientData } from "@/types/firebase";

const ClientFormAddressField: FC<TextFieldProps> = () => {
  /** Values */

  const { control } = useFormContext<ClientData>();
  const queryClient = useQueryClient();

  return (
    <Controller
      name="address"
      control={control}
      rules={{
        validate: {
          isAddress: async (value) => {
            const isValid = await queryClient.fetchQuery(
              validateAddress(value)
            );
            return isValid || "Must be a valid address";
          },
        },
      }}
      render={({ field, formState: { errors } }) => (
        <AddressField
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
          {...field}
        />
      )}
    />
  );
};

export default ClientFormAddressField;
