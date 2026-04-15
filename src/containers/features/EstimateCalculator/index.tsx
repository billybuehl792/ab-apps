import React, { useState } from "react";
import { Stack, type StackProps } from "@mui/material";
import { useForm } from "react-hook-form";
import useMaterials from "@/store/hooks/useMaterials";
import EstimateCalculatorProvider from "./providers/EstimateCalculatorProvider";
import EstimateCalculatorOutput from "./layout/EstimateCalculatorOutput";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import EstimateCalculatorMaterialFormDrawer from "./components/modals/EstimateCalculatorMaterialFormDrawer";
import {
  ESTIMATE_CALCULATOR_CATEGORY_OPTIONS,
  ESTIMATE_CALCULATOR_DEFAULT_VALUES,
} from "./constants";
import type {
  TEstimateCalculatorCategory,
  EstimateCalculatorContextValue,
  EstimateCalculatorForm,
} from "./types";

type TEstimateCalculatorProps = Omit<
  StackProps<"form">,
  "component" | "onSubmit" | "onReset"
>;

const EstimateCalculator: React.FC<TEstimateCalculatorProps> = (props) => {
  const [materialModal, setMaterialModal] = useState<
    EstimateCalculatorContextValue["materialModal"]
  >({ open: false, material: null });
  const [category, setCategory] = useState<TEstimateCalculatorCategory>(
    ESTIMATE_CALCULATOR_CATEGORY_OPTIONS[0].value,
  );

  /** Values */

  const materials = useMaterials();

  const queryOptions = materials.queries.list({
    orderBy: "label",
    filters: [{ field: "category", operator: "==", value: category }],
  });
  const methods = useForm<EstimateCalculatorForm>({
    defaultValues: ESTIMATE_CALCULATOR_DEFAULT_VALUES,
  });

  /** Callbacks */

  return (
    <EstimateCalculatorProvider
      value={{
        queryOptions,
        methods,
        category,
        materialModal,
        onCategoryChange: setCategory,
        setMaterialModal: (open, material) => {
          setMaterialModal({ open, material: material ?? null });
        },
      }}
    >
      <Stack
        component="form"
        noValidate
        onSubmit={(event) => event.preventDefault()}
        onReset={(event) => event.preventDefault()}
        {...props}
      >
        <Stack
          position="sticky"
          top={0}
          zIndex={1}
          spacing={1}
          p={2}
          pb={0}
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
