import { useState, type ComponentProps, type FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Stack, type StackProps } from "@mui/material";
import { firestoreMutations } from "@/firebase/mutations";
import { type EstimateCalculatorFormValues } from "..";
import MaterialCard from "@/containers/cards/MaterialCard";
import MaterialFormDialog from "@/containers/modals/MaterialFormDialog";
import EstimateCalculatorTaxCard from "../cards/EstimateCalculatorTaxCard";
import IntegerField from "@/components/fields/IntegerField";
import { Add, Delete, Edit } from "@mui/icons-material";
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

  /** Mutations */

  const { create, update, remove } = firestoreMutations.useMaterialMutations();

  return (
    <>
      <Stack component="form" spacing={1} {...props}>
        <Stack component="fieldset" spacing={0.5}>
          {fields.map((material, index) => (
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
                  {...register(`materials.${index}.count`)}
                />
              }
              {...cardProps}
            />
          ))}
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
