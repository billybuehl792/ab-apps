import { type ComponentProps, type FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Stack, type StackProps } from "@mui/material";
import { EstimateCalculatorFormValues } from "..";
import MaterialCard from "@/containers/cards/MaterialCard";

interface EstimateCalculatorFieldArrayProps extends StackProps {
  slotProps?: {
    card?: Partial<ComponentProps<typeof MaterialCard>>;
  };
}

const EstimateCalculatorFieldArray: FC<EstimateCalculatorFieldArrayProps> = ({
  slotProps: { card: cardProps } = {},
  ...props
}) => {
  /** Values */

  const { control, register } = useFormContext<EstimateCalculatorFormValues>();
  const { fields } = useFieldArray<
    EstimateCalculatorFormValues,
    "materials",
    "fieldId"
  >({
    name: "materials",
    keyName: "fieldId",
    control,
  });

  return (
    <Stack component="form" spacing={1} {...props}>
      {fields.map((field, index) => {
        return (
          <MaterialCard
            key={field.id}
            material={field}
            {...cardProps}
            slotProps={{
              ...cardProps?.slotProps,
              textField: {
                ...register(`materials.${index}.count`, {
                  min: 0,
                  max: 1000,
                }),
              },
            }}
          />
        );
      })}
    </Stack>
  );
};

export default EstimateCalculatorFieldArray;
