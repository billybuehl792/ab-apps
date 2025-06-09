import { useState, type ComponentProps } from "react";
import { Stack, type StackProps } from "@mui/material";
import { orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";

import { getMaterialList } from "@/lib/queries/firebase/materials";
import EstimateCalculatorProvider from "./providers/EstimateCalculatorProvider";
import EstimateCalculatorOutput from "./layout/EstimateCalculatorOutput";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import EstimateCalculatorMaterialFormDrawer from "./components/modals/EstimateCalculatorMaterialFormDrawer";
import { EMPTY_OBJECT } from "@/constants/utility";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "./constants";
import type {
  EstimateCalculatorContextValue,
  EstimateCalculatorValues,
} from "./types";

interface EstimateCalculatorProps extends StackProps<"form"> {
  slotProps?: {
    fieldArray?: Partial<ComponentProps<typeof EstimateCalculatorFieldArray>>;
    footer?: Partial<ComponentProps<typeof EstimateCalculatorFooter>>;
    header?: StackProps;
    materialFormDrawer?: Partial<
      ComponentProps<typeof EstimateCalculatorMaterialFormDrawer>
    >;
    meta?: Partial<ComponentProps<typeof EstimateCalculatorMeta>>;
    output?: Partial<ComponentProps<typeof EstimateCalculatorOutput>>;
  };
}

const EstimateCalculator = ({
  slotProps: {
    fieldArray: fieldArrayProps,
    footer: footerProps,
    header: headerProps,
    materialFormDrawer: materialFormDrawerProps,
    meta: metaProps,
    output: outputProps,
  } = EMPTY_OBJECT,
  ...props
}: EstimateCalculatorProps) => {
  const [materialModal, setMaterialModal] = useState<
    EstimateCalculatorContextValue["materialModal"]
  >({ open: false, material: null });

  /** Values */

  const queryOptions = getMaterialList(orderBy("value", "desc"));
  const methods = useForm<EstimateCalculatorValues>({
    defaultValues: ESTIMATE_CALCULATOR_DEFAULT_VALUES,
  });

  /** Callbacks */

  const onSubmit: EstimateCalculatorProps["onSubmit"] = (event) => {
    event.preventDefault();
  };

  const onReset: EstimateCalculatorProps["onReset"] = (event) => {
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
          {...headerProps}
        >
          <EstimateCalculatorMeta {...metaProps} />
          <EstimateCalculatorOutput {...outputProps} />
        </Stack>

        <EstimateCalculatorFieldArray
          flexGrow={1}
          px={2}
          py={1}
          {...fieldArrayProps}
        />

        <EstimateCalculatorFooter
          position="sticky"
          bottom={0}
          padding={2}
          paddingTop={0}
          bgcolor={({ palette }) => palette.background.default}
          {...footerProps}
        />
      </Stack>

      {/* Modals */}
      <EstimateCalculatorMaterialFormDrawer {...materialFormDrawerProps} />
    </EstimateCalculatorProvider>
  );
};

export default EstimateCalculator;
