import { type ComponentProps } from "react";
import { Controller } from "react-hook-form";

import AddressField from "@/components/fields/AddressField";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const EstimateCalculatorAddressField = (
  props: Partial<ComponentProps<typeof AddressField>>
) => {
  /** Values */

  const {
    methods: { control },
  } = useEstimateCalculator();

  return (
    <Controller
      name="address"
      control={control}
      rules={{ required: "Address is required" }}
      render={({ field: { onChange, ...field }, formState: { errors } }) => (
        <AddressField
          size="small"
          placeholder="Address"
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
          {...field}
          {...props}
          onChange={(_, value) => {
            onChange(value);
          }}
        />
      )}
    />
  );
};

export default EstimateCalculatorAddressField;
