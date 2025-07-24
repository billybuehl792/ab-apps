import { type FormEventHandler, useState } from "react";
import { Stack, type StackProps } from "@mui/material";
import { useForm } from "react-hook-form";
import useMaterials from "@/hooks/useMaterials";
import EstimateCalculatorProvider from "./providers/EstimateCalculatorProvider";
import EstimateCalculatorOutput from "./layout/EstimateCalculatorOutput";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import EstimateCalculatorMaterialFormDrawer from "./components/modals/EstimateCalculatorMaterialFormDrawer";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "./constants";
import type {
  EstimateCalculatorContextValue,
  EstimateCalculatorForm,
} from "./types";

const EstimateCalculator = (props: StackProps<"form">) => {
  const [materialModal, setMaterialModal] = useState<
    EstimateCalculatorContextValue["materialModal"]
  >({ open: false, material: null });

  /** Values */

  const materials = useMaterials();

  const queryOptions = materials.queries.list({ orderBy: "label" });
  const methods = useForm<EstimateCalculatorForm>({
    defaultValues: ESTIMATE_CALCULATOR_DEFAULT_VALUES,
  });

  /** Callbacks */

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  const onReset: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <EstimateCalculatorProvider
      value={{
        queryOptions,
        methods,
        materialModal,
        setMaterialModal: (open, material) => {
          setMaterialModal({ open, material: material ?? null });
        },
      }}
    >
      <Stack
        component="form"
        noValidate
        position="relative"
        overflow="auto"
        flexGrow={1}
        onSubmit={onSubmit}
        onReset={onReset}
        {...props}
      >
        <Stack
          position="sticky"
          top={0}
          zIndex={1}
          spacing={1}
          padding={2}
          paddingBottom={0}
          bgcolor={({ palette }) => palette.background.default}
        >
          <EstimateCalculatorMeta />
          <EstimateCalculatorOutput />
        </Stack>

        <EstimateCalculatorFieldArray flexGrow={1} px={2} py={1} />

        <EstimateCalculatorFooter
          position="sticky"
          bottom={0}
          padding={2}
          paddingTop={0}
          bgcolor={({ palette }) => palette.background.default}
        />
      </Stack>

      {/* Modals */}
      <EstimateCalculatorMaterialFormDrawer />
    </EstimateCalculatorProvider>
  );
};

export default EstimateCalculator;
