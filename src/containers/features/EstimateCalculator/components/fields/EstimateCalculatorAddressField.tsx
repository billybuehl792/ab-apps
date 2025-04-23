import { type ComponentProps } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller } from "react-hook-form";

import { validateAddress } from "@/lib/queries/google-maps";
import AddressField from "@/components/fields/AddressField";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const EstimateCalculatorAddressField = (
  props: Partial<ComponentProps<typeof AddressField>>
) => {
  /** Values */

  const {
    methods: { control },
  } = useEstimateCalculator();
  const queryClient = useQueryClient();

  return (
    <Controller
      name="address"
      control={control}
      rules={{
        required: "Address is required",
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
          label=""
          size="small"
          placeholder="Address"
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default EstimateCalculatorAddressField;
