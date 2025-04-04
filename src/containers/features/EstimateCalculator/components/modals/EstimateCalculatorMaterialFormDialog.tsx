import { type ComponentProps, type FC } from "react";
import MaterialFormDialog from "@/containers/modals/MaterialFormDialog";
import { useEstimateCalculator } from "../../context/EstimateCalculatorContext";
import { firestoreMutations } from "@/firebase/mutations";

const EstimateCalculatorMaterialFormDialog: FC<
  Partial<ComponentProps<typeof MaterialFormDialog>>
> = (props) => {
  /** Values */

  const { materialModal, setMaterialModal } = useEstimateCalculator();

  /** Mutations */

  const { create, update } = firestoreMutations.useMaterialMutations();

  const onClose = () => setMaterialModal(false, materialModal.material);

  const onTransitionExited = () => setMaterialModal(false);

  return (
    <MaterialFormDialog
      open={materialModal.open}
      label={materialModal.material?.label.toTitleCase() ?? "Create Material"}
      onClose={onClose}
      onTransitionExited={onTransitionExited}
      slotProps={{
        form: {
          values: materialModal.material ?? undefined,
          submitLabel: materialModal.material ? "Update" : "Create",
          disableReset: !materialModal.material,
          onSubmit: async (formData) => {
            if (materialModal.material)
              await update.mutateAsync({
                id: materialModal.material.id,
                ...formData,
              });
            else await create.mutateAsync(formData);

            onClose();
          },
        },
      }}
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialFormDialog;
