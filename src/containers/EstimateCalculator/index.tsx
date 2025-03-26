import { useMemo, useState, type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { Button, Stack, type StackProps } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { materialCollection } from "@/firebase/collections";
import MaterialFormDialog from "../modals/MaterialFormDialog";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import MaterialCard from "../cards/MaterialCard/MaterialCard";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import type { MaterialData } from "@/firebase/types";

export interface EstimateCalculatorFormValues {
  materials: {
    id: string;
    value: number;
    count?: number;
  }[];
}

const EstimateCalculator: FC<StackProps> = ({ ...props }) => {
  const [materialFormOpen, setMaterialFormOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    useState<QueryDocumentSnapshot<MaterialData> | null>(null);

  /** Queries */

  const materialsQuery = useQuery({
    queryKey: [materialCollection.path, orderBy("value", "desc")] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(materialCollection, ...constraints)),
  });

  /** Values */

  const materials = useMemo(
    () =>
      materialsQuery.data?.docs.map((doc) => ({
        id: doc.id,
        value: doc.data().value,
      })) ?? [],
    [materialsQuery.data]
  );

  const methods = useForm<EstimateCalculatorFormValues>({
    mode: "all",
    values: { materials },
    ...props,
  });
  const { fields } = useFieldArray<
    EstimateCalculatorFormValues,
    "materials",
    "fieldId"
  >({
    name: "materials",
    keyName: "fieldId",
    control: methods.control,
  });

  /** Callbacks */

  const handleCreateMaterial = async (data: MaterialData) => {
    try {
      await addDoc(materialCollection, { ...data, value: +data.value });
      materialsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMaterial = async (id: string, data: MaterialData) => {
    try {
      const materialRef = doc(materialCollection, id);
      await updateDoc(materialRef, { ...data, value: +data.value });
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
          <Stack component="form" spacing={1} border="none" padding={0}>
            {fields.map((field, index) => {
              const material = materialsQuery.data?.docs.find(
                ({ id }) => id === field.id
              );
              if (!material) return null;

              return (
                <MaterialCard
                  key={field.id}
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
                      onClick: () => handleDeleteMaterial(material.id),
                    },
                  ]}
                  slotProps={{
                    textField: {
                      ...methods.register(`materials.${index}.count`, {
                        min: 0,
                        max: 1000,
                      }),
                    },
                  }}
                  onClick={() => {
                    setSelectedMaterial(material);
                    setMaterialFormOpen(true);
                  }}
                />
              );
            })}
          </Stack>

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
            ? selectedMaterial.data().label.toTitleCase()
            : "Create Material"
        }
        values={selectedMaterial?.data()}
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
        onTransitionExited={() => setSelectedMaterial(null)}
      />
    </>
  );
};

export default EstimateCalculator;
