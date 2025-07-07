import { type ComponentProps } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useMaterials from "@/hooks/firebase/useMaterials";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import MaterialFormDrawer from "@/containers/modals/MaterialFormDrawer";
import MaterialForm from "@/containers/forms/MaterialForm";

const EstimateCalculatorMaterialFormDrawer = (
  props: Partial<ComponentProps<typeof MaterialFormDrawer>>
) => {
  /** Values */

  const queryClient = useQueryClient();
  const { queryOptions, materialModal, setMaterialModal } =
    useEstimateCalculator();

  /** Mutations */

  const {
    mutations: { update, create },
  } = useMaterials();

  /** Callbacks */

  const onClose = () => {
    setMaterialModal(false, materialModal.material);
  };

  const onTransitionExited = () => {
    setMaterialModal(false, null);
  };

  const handleSubmit: ComponentProps<typeof MaterialForm>["onSubmit"] = async (
    data
  ) => {
    if (materialModal.material)
      await update.mutateAsync(
        { id: materialModal.material.id, ...data },
        { onSuccess: () => void queryClient.invalidateQueries(queryOptions) }
      );
    else
      await create.mutateAsync(data, {
        onSuccess: () => void queryClient.invalidateQueries(queryOptions),
      });

    onClose();
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
          onSubmit: handleSubmit,
          onReset: onClose,
        },
      }}
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialFormDrawer;
