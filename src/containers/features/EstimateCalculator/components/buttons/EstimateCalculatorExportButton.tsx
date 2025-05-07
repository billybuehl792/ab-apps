import { type ComponentProps } from "react";
import { IosShare } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import MenuOptionsButton from "@/components/buttons/MenuOptionsButton";
import { createEstimateCalculatorDoc } from "../../utils";

const EstimateCalculatorExportButton = (
  props: Partial<ComponentProps<typeof MenuOptionsButton>>
) => {
  /** Values */

  const {
    methods: { handleSubmit },
  } = useEstimateCalculator();
  const { enqueueSnackbar } = useSnackbar();

  /** Callbacks */

  const handleSaveDocument = handleSubmit((formData) => {
    try {
      const doc = createEstimateCalculatorDoc(formData);
      doc.save(`${formData.name}.pdf`);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      enqueueSnackbar("Something went wrong while attempting to export file", {
        variant: "error",
      });
      throw error;
    }
  });

  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<IosShare />}
      color="primary"
      onClick={() => void handleSaveDocument()}
      {...props}
    >
      Export
    </Button>
  );
};

export default EstimateCalculatorExportButton;
