import { type ComponentProps } from "react";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import PercentField from "@/components/fields/PercentField";

const MIN = 0;
const MAX = 100;

const EstimateCalculatorTaxField = (
  props: Partial<ComponentProps<typeof PercentField>>
) => {
  /** Values */

  const { methods } = useEstimateCalculator();

  return (
    <PercentField
      size="small"
      placeholder="0"
      error={!!methods.formState.errors.tax}
      sx={{ width: 110, flexShrink: 0 }}
      {...methods.register("tax", {
        min: {
          value: MIN,
          message: `Value cannot be less than ${String(MIN)}%`,
        },
        max: {
          value: MAX,
          message: `Value cannot be greater than ${String(MAX)}%`,
        },
        setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
      })}
      {...props}
    />
  );
};

export default EstimateCalculatorTaxField;
