import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray } from "react-hook-form";
import { Skeleton, Stack, type StackProps } from "@mui/material";
import useEstimateCalculator from "../hooks/useEstimateCalculator";
import EstimateCalculatorMaterialCard from "../components/cards/EstimateCalculatorMaterialCard";
import EstimateCalculatorTaxCard from "../components/cards/EstimateCalculatorTaxCard";
import EstimateCalculatorAdditionalCard from "../components/cards/EstimateCalculatorAdditionalCard";
import EstimateCalculatorAddMaterialButton from "../components/buttons/EstimateCalculatorAddMaterialButton";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "@/containers/features/EstimateCalculator/constants";
import type { EstimateCalculatorForm } from "../types";

const EstimateCalculatorFieldArray = (props: StackProps) => {
  /** Values */

  const { queryOptions, methods } = useEstimateCalculator();

  /** Queries */

  const materialsQuery = useQuery(queryOptions);
  const materials: EstimateCalculatorForm["materials"] = useMemo(
    () =>
      materialsQuery.data?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        count: null,
      })) ?? [],
    [materialsQuery.data]
  );

  /** Form */

  const { control, setValue, getValues, reset } = methods;
  const fieldArray = useFieldArray<
    EstimateCalculatorForm,
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
    <Stack spacing={1} {...props}>
      <Stack spacing={0.5}>
        {materialsQuery.isLoading
          ? Array(10)
              .fill(null)
              .map(() => (
                <Skeleton
                  key={crypto.randomUUID()}
                  variant="rounded"
                  height={72}
                />
              ))
          : fieldArray.fields.map(
              ({ fieldId: _fieldId, ...material }, index) => (
                <EstimateCalculatorMaterialCard
                  key={material.id}
                  material={material}
                  index={index}
                />
              )
            )}
        <EstimateCalculatorAdditionalCard />
        <EstimateCalculatorTaxCard />
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <EstimateCalculatorAddMaterialButton />
      </Stack>
    </Stack>
  );
};

export default EstimateCalculatorFieldArray;
