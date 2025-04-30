import { type ComponentProps } from "react";

import useMaterials from "@/hooks/firebase/useMaterials";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import MaterialFormDrawer from "@/containers/modals/MaterialFormDrawer";

const EstimateCalculatorMaterialFormDrawer = (
  props: Partial<ComponentProps<typeof MaterialFormDrawer>>
) => {
  /** Values */

  const { materialModal, setMaterialModal } = useEstimateCalculator();

  /** Mutations */

  const { create, update } = useMaterials();

  /** Callbacks */

  const onClose = () => {
    setMaterialModal(false, materialModal.material);
  };

  const onTransitionExited = () => {
    setMaterialModal(false);
  };

  return (
    <MaterialFormDrawer
      open={materialModal.open}
      title={materialModal.material?.label ?? "Create Material"}
      fullHeight
      onClose={onClose}
      onTransitionExited={onTransitionExited}
      slotProps={{
        form: {
          values: materialModal.material ?? undefined,
          slotProps: {
            actions: {
              submitLabel: materialModal.material ? "Update" : "Create",
              resetAsCancel: true,
            },
          },
          onSubmit: async (formData) => {
            if (materialModal.material)
              await update.mutateAsync({
                id: materialModal.material.id,
                ...formData,
              });
            else await create.mutateAsync(formData);

            onClose();
          },
          onReset: onClose,
        },
      }}
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialFormDrawer;
