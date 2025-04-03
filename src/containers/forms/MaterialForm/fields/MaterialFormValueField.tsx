import { type ComponentProps, type FC } from "react";
import { useFormContext } from "react-hook-form";
import DollarField from "@/components/fields/DollarField";
import type { MaterialData } from "@/firebase/types";

const MIN_VALUE = 0;
const MAX_VALUE = 10_000;

const MaterialFormValueField: FC<ComponentProps<typeof DollarField>> = () => {
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
        min: { value: MIN_VALUE, message: `Min value is ${MIN_VALUE}` },
        max: { value: MAX_VALUE, message: `Max value is ${MAX_VALUE}` },
        setValueAs: (value) => Math.min(Math.max(+value, MIN_VALUE), MAX_VALUE),
      })}
    />
  );
};

export default MaterialFormValueField;
