import { type ComponentProps, useState } from "react";
import { Download, IosShare } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import MenuOptionsButton from "@/components/buttons/MenuOptionsButton";
import { createEstimateCalculatorDoc } from "../../utils";

const EstimateCalculatorExportButton = (
  props: Partial<ComponentProps<typeof MenuOptionsButton>>
) => {
  const [isLoading, setIsLoading] = useState(false);

  /** Values */

  const {
    methods: { handleSubmit },
  } = useEstimateCalculator();
  const { enqueueSnackbar } = useSnackbar();

  /** Callbacks */

  const handleShareDocument = handleSubmit(async (formData) => {
    setIsLoading(true);

    try {
      const doc = createEstimateCalculatorDoc(formData);
      const blob = doc.output("blob");
      const fileName = `${formData.name}.pdf`;
      const file = new File([blob], fileName, { type: "application/pdf" });
      await navigator.share({
        title: fileName,
        text: `AB Apps Estimate for ${formData.name} at ${formData.address}`,
        files: [file],
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        enqueueSnackbar(
          "Something went wrong while attempting to export file",
          { variant: "error" }
        );
    } finally {
      setIsLoading(false);
    }
  });

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

  /** Options */

  const options: MenuOption[] = [
    {
      id: "share",
      label: "Share",
      icon: <IosShare />,
      onClick: handleShareDocument,
    },
    {
      id: "view",
      label: "Download",
      icon: <Download />,
      onClick: handleSaveDocument,
    },
  ];

  return (
    <MenuOptionsButton
      type="submit"
      variant="contained"
      color="primary"
      options={options}
      loading={isLoading}
      slotProps={{
        menu: {
          slotProps: {
            menu: {
              anchorOrigin: { vertical: "top", horizontal: "center" },
              transformOrigin: { vertical: "bottom", horizontal: "center" },
            },
          },
        },
      }}
      {...props}
    >
      Export
    </MenuOptionsButton>
  );
};

export default EstimateCalculatorExportButton;
