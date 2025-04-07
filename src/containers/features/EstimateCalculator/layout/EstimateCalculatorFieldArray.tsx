import { useEffect, useMemo, type ComponentProps, type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Skeleton, Stack, type StackProps } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEstimateCalculator } from "../context/EstimateCalculatorContext";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "@/containers/features/EstimateCalculator/constants";
import EstimateCalculatorMaterialCard from "../components/cards/EstimateCalculatorMaterialCard";
import EstimateCalculatorTaxCard from "../components/cards/EstimateCalculatorTaxCard";
import EstimateCalculatorAdditionalCard from "../components/cards/EstimateCalculatorAdditionalCard";
import type { EstimateCalculatorValues } from "../types";

interface EstimateCalculatorFieldArrayProps extends StackProps {
  slotProps?: {
    card?: Partial<ComponentProps<typeof EstimateCalculatorMaterialCard>>;
  };
}

const EstimateCalculatorFieldArray: FC<EstimateCalculatorFieldArrayProps> = ({
  slotProps: { card: cardProps } = {},
  ...props
}) => {
  /** Values */

  const { queryOptions, setMaterialModal } = useEstimateCalculator();

  /** Queries */

  const materialsQuery = useQuery(queryOptions);
  const materials: EstimateCalculatorValues["materials"] = useMemo(
    () =>
      materialsQuery.data?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        count: null,
      })) ?? [],
    [materialsQuery.data]
  );

  /** Form */

  const { control, setValue, getValues, reset } =
    useFormContext<EstimateCalculatorValues>();
  const fieldArray = useFieldArray<
    EstimateCalculatorValues,
    "materials",
    "fieldId"
  >({
    name: "materials",
    keyName: "fieldId",
    control,
  });

  /** Effects */

  useEffect(() => {
    const currentValues = getValues();
    const merged = materials.map((m) => {
      const existing = currentValues.materials.find(({ id }) => m.id === id);
      return { ...m, count: existing?.count || null };
    });

    reset({ ...ESTIMATE_CALCULATOR_DEFAULT_VALUES, materials });

    setValue("name", currentValues.name);
    setValue("address", currentValues.address);
    setValue("tax", currentValues.tax);
    setValue("additional", currentValues.additional);
    setValue("materials", merged);
  }, [materials, setValue, getValues, reset]);

  return (
    <Stack component="form" spacing={1} {...props}>
      <Stack component="fieldset" spacing={0.5}>
        {materialsQuery.isLoading
          ? Array(10)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} variant="rounded" height={72} />
              ))
          : fieldArray.fields.map(
              ({ fieldId: _fieldId, ...material }, index) => (
                <EstimateCalculatorMaterialCard
                  key={material.id}
                  material={material}
                  index={index}
                  {...cardProps}
                />
              )
            )}
        <EstimateCalculatorAdditionalCard />
        <EstimateCalculatorTaxCard />
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="text"
          startIcon={<Add />}
          onClick={() => setMaterialModal(true, null)}
        >
          Material
        </Button>
      </Stack>
    </Stack>
  );
};

export default EstimateCalculatorFieldArray;
