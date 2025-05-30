import { type ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

import AddressField from "@/components/fields/AddressField";
import type { ClientData } from "@/types/firebase";

const ClientFormAddressField = (
  props: Partial<ComponentProps<typeof AddressField>>
) => {
  /** Values */

  const { control } = useFormContext<ClientData>();

  return (
    <Controller
      name="address"
      control={control}
      rules={{ required: "Address is required" }}
      render={({ field: { onChange, ...field }, formState: { errors } }) => (
        <AddressField
          label="Address"
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
          {...props}
          {...field}
          onChange={(_, value) => {
            onChange(value);
          }}
        />
      )}
    />
  );
};

export default ClientFormAddressField;
