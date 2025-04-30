import { type ComponentProps } from "react";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import DollarField from "@/components/fields/DollarField";

const MIN = 0;
const MAX = 10_000;

const EstimateCalculatorAdditionalField = (
  props: Partial<ComponentProps<typeof DollarField>>
) => {
  /** Values */

  const {
    methods: {
      formState: { errors },
      register,
    },
  } = useEstimateCalculator();

  return (
    <DollarField
      size="small"
      placeholder="0"
      error={!!errors.additional}
      sx={{ width: 120 }}
      {...props}
      {...register("additional", {
        min: {
          value: MIN,
          message: `Value cannot be less than ${String(MIN)}`,
        },
        max: {
          value: MAX,
          message: `Value cannot be greater than ${String(MAX)}`,
        },
        setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
      })}
    />
  );
};

export default EstimateCalculatorAdditionalField;
