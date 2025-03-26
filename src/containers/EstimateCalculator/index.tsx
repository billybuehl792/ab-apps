import { useState, type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { addDoc, deleteDoc, doc, orderBy, updateDoc } from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Stack, useMediaQuery, type StackProps } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { materialCollection } from "@/firebase/collections";
import { firestoreQueries } from "@/firebase/queries";
import MaterialFormDialog from "../modals/MaterialFormDialog";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import type { Material } from "@/firebase/types";

export interface EstimateCalculatorFormValues {
  materials: (Material & { count?: number })[];
}

const EstimateCalculator: FC<StackProps> = ({ ...props }) => {
  const [materialFormOpen, setMaterialFormOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<
    Material | undefined
  >(undefined);

  /** Queries */

  const materialsQuery = useQuery(
    firestoreQueries.getMaterialList(orderBy("value", "desc"))
  );

  /** Values */

  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const methods = useForm<EstimateCalculatorFormValues>({
    mode: "all",
    values: { materials: materialsQuery.data ?? [] },
    ...props,
  });

  /** Callbacks */

  const handleCreateMaterial = async (formData: Omit<Material, "id">) => {
    try {
      await addDoc(materialCollection, { ...formData, value: +formData.value });
      materialsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMaterial = async (
    id: string,
    formData: Omit<Material, "id">
  ) => {
    try {
      const materialRef = doc(materialCollection, id);
      await updateDoc(materialRef, { ...formData, value: +formData.value });
      materialsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    try {
      const materialRef = doc(materialCollection, id);
      await deleteDoc(materialRef);
      materialsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  };

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
                    onClick: () => handleDeleteMaterial(material.id),
                  },
                ],
                ...(!isSm && {
                  onClick: (_, material) => {
                    setMaterialFormOpen(true);
                    setSelectedMaterial(material);
                  },
                }),
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
              onClick: () => {
                handleDeleteMaterial(selectedMaterial.id);
                setMaterialFormOpen(false);
              },
            },
          ],
        })}
        onSubmit={async (formData) => {
          if (selectedMaterial)
            await handleUpdateMaterial(selectedMaterial.id, formData);
          else await handleCreateMaterial(formData);

          setMaterialFormOpen(false);
        }}
        onClose={() => setMaterialFormOpen(false)}
        onTransitionExited={() => setSelectedMaterial(undefined)}
      />
    </>
  );
};

export default EstimateCalculator;
