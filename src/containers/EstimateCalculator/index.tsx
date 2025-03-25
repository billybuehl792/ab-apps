import { useState, type FC } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Stack,
  TextField,
  type StackProps,
} from "@mui/material";
import { materialCollection } from "@/firebase/collections";
import MaterialFormDialog from "../modals/MaterialFormDialog";
import type { MaterialData } from "@/firebase/types";
import { useFieldArray, useForm } from "react-hook-form";
import MaterialCard from "../cards/MaterialCard/MaterialCard";

interface FormValues {
  materials: { id: string; count?: number }[];
}

const EstimateCalculator: FC<StackProps> = ({ ...props }) => {
  const [materialFormOpen, setMaterialFormOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    useState<QueryDocumentSnapshot<MaterialData> | null>(null);

  /** Values */

  const materialsQuery = useQuery({
    queryKey: [materialCollection.path],
    queryFn: () => getDocs(query(materialCollection, orderBy("value", "desc"))),
  });

  const { control, register, watch } = useForm<FormValues>({
    mode: "all",
    values: {
      materials: materialsQuery.data?.docs.map(({ id }) => ({ id })) ?? [],
    },
    ...props,
  });
  const { fields } = useFieldArray({
    name: "materials",
    keyName: "fieldId",
    control,
  });

  const fieldArray = watch("materials");
  const total = fieldArray.reduce((acc, { id, count = 0 }) => {
    const material = materialsQuery.data?.docs.find(
      ({ id: docId }) => docId === id
    );
    if (!material) return acc;

    return acc + material.data().value * count;
  }, 0);
  const totalUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  /** Callbacks */

  const handleCreateMaterial = async (data: MaterialData) => {
    try {
      await addDoc(materialCollection, { ...data, value: +data.value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMaterial = async (id: string, data: MaterialData) => {
    try {
      const materialRef = doc(materialCollection, id);
      await updateDoc(materialRef, { ...data, value: +data.value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMaterial = async (
    material: QueryDocumentSnapshot<MaterialData>
  ) => {
    try {
      await deleteDoc(material.ref);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack spacing={2} {...props}>
        <Grid container spacing={2}>
          <Grid component={Card} size={{ xs: 12, sm: 6 }}>
            <CardContent sx={{ pb: 0 }}>Total</CardContent>
            <CardHeader title={totalUSD} />
          </Grid>
          <Grid component={Card} size={{ xs: 12, sm: 6 }}>
            <CardContent sx={{ pb: 0 }}>Subtotal</CardContent>
            <CardHeader title={totalUSD} />
          </Grid>
        </Grid>
        <Stack component="form" spacing={2}>
          <Stack spacing={1} component="fieldset" border="none" padding={0}>
            {fields.map((field, index) => {
              const material = materialsQuery.data?.docs.find(
                ({ id }) => id === field.id
              );
              if (!material) return null;

              return (
                <MaterialCard
                  key={field.id}
                  material={material}
                  onClick={(_, material) => {
                    setSelectedMaterial(material);
                    setMaterialFormOpen(true);
                  }}
                  content={
                    <TextField
                      variant="filled"
                      fullWidth
                      type="number"
                      onClick={(event) => event.stopPropagation()}
                      slotProps={{
                        input: { inputProps: { min: 0, max: 1000 } },
                      }}
                      {...register(`materials.${index}.count`, {
                        min: 0,
                        max: 1000,
                      })}
                    />
                  }
                />
              );
            })}
          </Stack>
        </Stack>
      </Stack>

      {/* Modals */}
      <MaterialFormDialog
        open={materialFormOpen}
        title={
          selectedMaterial
            ? `Edit ${selectedMaterial.data().label}`
            : "Create Material"
        }
        values={
          selectedMaterial?.data() ?? { label: "", value: 0, description: "" }
        }
        onSubmit={async (values) => {
          if (selectedMaterial)
            await handleUpdateMaterial(selectedMaterial.id, values);
          else await handleCreateMaterial(values);

          setMaterialFormOpen(false);
          materialsQuery.refetch();
        }}
        onClose={() => setMaterialFormOpen(false)}
        onTransitionExited={() => setSelectedMaterial(null)}
      />
    </>
  );
};

export default EstimateCalculator;
