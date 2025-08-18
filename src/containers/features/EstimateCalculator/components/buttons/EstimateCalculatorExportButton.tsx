import { type FormEventHandler } from "react";
import { useSnackbar } from "notistack";
import { Button, type ButtonProps } from "@mui/material";
import { SaveAlt } from "@mui/icons-material";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import { createEstimateCalculatorDoc } from "../../utils";

const EstimateCalculatorExportButton = (props: ButtonProps) => {
  /** Values */

  const { methods } = useEstimateCalculator();
  const { enqueueSnackbar } = useSnackbar();

  /** Callbacks */

  const handleSaveDocument = methods.handleSubmit((formData) => {
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
  }) as FormEventHandler;

  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<SaveAlt />}
      color="primary"
      onClick={handleSaveDocument}
      {...props}
    >
      Export
    </Button>
  );
};

export default EstimateCalculatorExportButton;
