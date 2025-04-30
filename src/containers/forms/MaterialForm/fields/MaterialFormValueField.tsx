import { type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import DollarField from "@/components/fields/DollarField";
import type { MaterialFormValues } from "../types";

const MIN = 0;
const MAX = 10_000;

const MaterialFormValueField = (props: ComponentProps<typeof DollarField>) => {
  /** Values */

  const methods = useFormContext<MaterialFormValues>();

  return (
    <DollarField
      label="Cost / Unit"
      error={!!methods.formState.errors.value}
      helperText={methods.formState.errors.value?.message}
      {...methods.register("value", {
        required: "Cost is required",
        min: { value: MIN, message: `Min value is ${String(MIN)}` },
        max: { value: MAX, message: `Max value is ${String(MAX)}` },
        setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
      })}
      {...props}
    />
  );
};

export default MaterialFormValueField;
