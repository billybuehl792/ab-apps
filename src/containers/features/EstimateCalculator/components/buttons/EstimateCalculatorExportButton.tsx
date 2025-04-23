import { Button, type ButtonProps } from "@mui/material";
import { useSnackbar } from "notistack";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import { delay } from "@/utils/queries";
import { createEstimateCalculatorDoc } from "../../utils";

const EstimateCalculatorExportButton = (props: ButtonProps) => {
  /** Values */

  const {
    methods: { handleSubmit },
  } = useEstimateCalculator();
  const { enqueueSnackbar } = useSnackbar();

  /** Callbacks */

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();

    try {
      const doc = createEstimateCalculatorDoc(data);
      await delay(300);

      doc.output("dataurlnewwindow", {
        filename: `${data.name}.pdf`,
      });

      // doc.output("blob");

      // const file = new File([blob], fileName, { type: "application/pdf" });
      // await navigator.share({
      //   title: fileName,
      //   text: "Check this out!",
      //   files: [file],
      // });
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
      color="primary"
      onClick={(event) => void onSubmit(event)}
      {...props}
    >
      Export
    </Button>
  );
};

export default EstimateCalculatorExportButton;
