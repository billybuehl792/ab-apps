import { type ComponentProps } from "react";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import IntegerField from "@/components/fields/IntegerField";

const MIN = 0;
const MAX = 10_000;

const EstimateCalculatorCountField = ({
  index,
  ...props
}: Partial<ComponentProps<typeof IntegerField>> & { index: number }) => {
  /** Values */

  const { methods } = useEstimateCalculator();

  return (
    <IntegerField
      size="small"
      placeholder="0"
      error={!!methods.formState.errors.materials?.[index]?.count}
      onClick={(event) => {
        event.stopPropagation();
      }}
      sx={{ width: 100, flexShrink: 0 }}
      {...props}
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      {...methods.register(`materials.${index}.count`, {
        min: { value: MIN, message: `Min value is ${String(MIN)}` },
        max: { value: MAX, message: `Max value is ${String(MAX)}` },
        setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
      })}
    />
  );
};

export default EstimateCalculatorCountField;
