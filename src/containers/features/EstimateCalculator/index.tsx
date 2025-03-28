import { useMemo, useState, type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Stack, type StackProps } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import MaterialFormDialog from "@/containers/lists/NavigationList/modals/MaterialFormDialog";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import type { Material } from "@/firebase/types";

export interface EstimateCalculatorFormValues {
  materials: (Material & { count?: number })[];
}

const EstimateCalculator: FC<StackProps> = (props) => {
  const [materialFormOpen, setMaterialFormOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<
    Material | undefined
  >(undefined);

  /** Queries */

  const materialsQuery = useQuery(
    firestoreQueries.getMaterialList(orderBy("value", "desc"))
  );
  const materials = useMemo(
    () =>
      materialsQuery.data?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) ??
      [],
    [materialsQuery.data]
  );

  /** Values */

  const { create, update, remove } = firestoreMutations.useMaterialMutations();

  const methods = useForm<EstimateCalculatorFormValues>({
    mode: "all",
    values: { materials },
    ...props,
  });

  return (
    <>
      <FormProvider {...methods}>
        <Stack spacing={1} {...props}>
          <EstimateCalculatorHeader />
          <EstimateCalculatorFieldArray
            slotProps={{
              card: {
                options: (material) => [
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
                    onClick: () =>
                      remove.mutate(material.id, {
                        onSuccess: () => materialsQuery.refetch(),
                      }),
                  },
                ],
              },
            }}
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button
              startIcon={<Add />}
              onClick={() => setMaterialFormOpen(true)}
            >
              Material
            </Button>
          </Stack>
        </Stack>
      </FormProvider>

      {/* Modals */}
      <MaterialFormDialog
        open={materialFormOpen}
        title={
          selectedMaterial
            ? selectedMaterial.label.toTitleCase()
            : "Create Material"
        }
        values={selectedMaterial}
        {...(!!selectedMaterial && {
          options: [
            {
              id: "delete",
              label: "Delete",
              icon: <Delete />,
              onClick: () =>
                remove.mutate(selectedMaterial.id, {
                  onSuccess: () => setMaterialFormOpen(false),
                }),
            },
          ],
        })}
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

export default EstimateCalculator;
