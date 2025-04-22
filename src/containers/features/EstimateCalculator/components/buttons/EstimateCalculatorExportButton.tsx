import { Button, type ButtonProps } from "@mui/material";
import { useSnackbar } from "notistack";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import { delay } from "@/utils/queries";
import { theme } from "@/config/theme";
import type { EstimateCalculatorValues } from "../../types";

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
      const doc = handleCreatePdf(data);
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

  const handleCreatePdf = (data: EstimateCalculatorValues) => {
    const materialTotal = data.materials.reduce(
      (acc, { value, count }) => acc + value * (count ?? 0),
      0
    );
    const subtotal = materialTotal + (data.additional ?? 0);
    const total = subtotal + (subtotal * data.tax) / 100;

    const doc = new jsPDF();

    // Meta
    autoTable(doc, {
      body: [[`Customer: ${data.name}`], [`Address: ${data.address}`]],
    });

    // Header
    autoTable(doc, {
      styles: { fillColor: theme.palette.primary.main },
      headStyles: { fontSize: 10, fontStyle: "normal" },
      footStyles: { fontSize: 16, fontStyle: "bold" },
      head: [["Subtotal", "Total"]],
      foot: [[subtotal.toUSD(), total.toUSD()]],
    });

    // Materials
    autoTable(doc, {
      head: [["Material", "Cost", "Quantity"]],
      body: data.materials
        .filter(({ count }) => !!count)
        .map((material) => [
          material.label,
          material.value.toUSD(),
          (material.count ?? 0).toString(),
        ]),
    });

    // Additional & Tax
    autoTable(doc, {
      columnStyles: {
        0: { cellWidth: "auto", halign: "right" },
        1: { cellWidth: 20, halign: "right" },
      },
      body: [
        ...(data.additional ? [["Additional", data.additional.toUSD()]] : []),
        ["Tax", `${data.tax.toString()}%`],
      ],
    });

    return doc;
  };

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
