import {
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type FC,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Skeleton, Stack, type StackProps } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import MaterialCard from "@/containers/cards/MaterialCard";
import MaterialFormDialog from "@/containers/modals/MaterialFormDialog";
import EstimateCalculatorTaxCard from "../cards/EstimateCalculatorTaxCard";
import IntegerField from "@/components/fields/IntegerField";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "@/constants/forms";
import { type EstimateCalculatorValues } from "..";
import type { Material } from "@/firebase/types";

interface EstimateCalculatorFieldArrayProps extends StackProps {
  slotProps?: {
    card?: Partial<ComponentProps<typeof MaterialCard>>;
  };
}

const EstimateCalculatorFieldArray: FC<EstimateCalculatorFieldArrayProps> = ({
  slotProps: { card: cardProps } = {},
  ...props
}) => {
  const [materialFormOpen, setMaterialFormOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<
    Material | undefined
  >(undefined);

  /** Queries */

  const materialsQuery = useQuery(
    firestoreQueries.getMaterialList(orderBy("value", "desc"))
  );
  const materials: EstimateCalculatorValues["materials"] = useMemo(
    () =>
      materialsQuery.data?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        count: null,
      })) ?? [],
    [materialsQuery.data]
  );

  /** Values */

  const { control, setValue, getValues, register, reset } =
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

  /** Mutations */

  const { create, update, remove } = firestoreMutations.useMaterialMutations();

  /** Effects */

  useEffect(() => {
    const currentValues = getValues();
    const merged = materials.map((m) => {
      const existing = currentValues.materials.find(({ id }) => m.id === id);
      return { ...m, count: existing?.count ?? null };
    });

    reset({ ...ESTIMATE_CALCULATOR_DEFAULT_VALUES, materials });

    setValue("name", currentValues.name);
    setValue("address", currentValues.address);
    setValue("tax", currentValues.tax);
    setValue("materials", merged);
  }, [materials, setValue, getValues, reset]);

  return (
    <>
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
                  <MaterialCard
                    key={material.id}
                    material={material}
                    options={[
                      {
                        id: "edit",
                        label: "Edit",
                        icon: <Edit />,
                        onClick: () => {
                          setSelectedMaterial(material);
                          setMaterialFormOpen(true);
                        },
                      },
                      {
                        id: "delete",
                        label: "Delete",
                        icon: <Delete />,
                        onClick: () => remove.mutate(material.id),
                      },
                    ]}
                    endContent={
                      <IntegerField
                        size="small"
                        slotProps={{
                          input: { inputProps: { min: 0, max: 1000 } },
                        }}
                        sx={{ width: 100 }}
                        {...register(`materials.${index}.count`, {
                          valueAsNumber: true,
                          min: { value: 0, message: "Min value is 0" },
                          max: { value: 1000, message: "Max value is 1000" },
                        })}
                      />
                    }
                    {...cardProps}
                  />
                )
              )}
          <EstimateCalculatorTaxCard />
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() => setMaterialFormOpen(true)}
          >
            Material
          </Button>
        </Stack>
      </Stack>

      {/* Modals */}
      <MaterialFormDialog
        open={materialFormOpen}
        title={
          selectedMaterial
            ? selectedMaterial.label.toTitleCase()
            : "Create Material"
        }
        values={selectedMaterial}
        onSubmit={async (formData) => {
          if (selectedMaterial)
            await update.mutateAsync({ id: selectedMaterial.id, ...formData });
          else await create.mutateAsync(formData);

          setMaterialFormOpen(false);
        }}
        onClose={() => setMaterialFormOpen(false)}
        onTransitionExited={() => setSelectedMaterial(undefined)}
      />
    </>
  );
};

export default EstimateCalculatorFieldArray;
