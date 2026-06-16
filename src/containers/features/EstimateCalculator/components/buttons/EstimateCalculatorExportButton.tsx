import { useSnackbar } from "notistack";
import { Button, type ButtonProps } from "@mui/material";
import { SaveAlt } from "@mui/icons-material";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import { createEstimateCalculatorDoc } from "../../utils";

const EstimateCalculatorExportButton = (props: ButtonProps) => {
  /** Values */

  const { methods, category } = useEstimateCalculator();
  const { enqueueSnackbar } = useSnackbar();

  /** Callbacks */

  const handleSaveDocument = methods.handleSubmit((formData) => {
    try {
      const doc = createEstimateCalculatorDoc(formData, category);
      // doc.autoPrint();
      // Create blob URL for better PWA compatibility
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      // Cleanup the object URL after a short delay
      setTimeout(() => URL.revokeObjectURL(url), 100);
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
