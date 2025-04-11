import { type ComponentProps, type FC } from "react";
import { useFormContext } from "react-hook-form";
import DollarField from "@/components/fields/DollarField";
import type { MaterialData } from "@/types/firebase";

const MIN = 0;
const MAX = 10_000;

const MaterialFormValueField: FC<ComponentProps<typeof DollarField>> = (
  props
) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<MaterialData>();

  return (
    <DollarField
      label="Cost / Unit"
      error={!!errors.value}
      helperText={errors.value?.message}
      {...register("value", {
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
