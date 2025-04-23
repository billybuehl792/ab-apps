import { type ComponentProps } from "react";
import { Stack, type StackProps } from "@mui/material";

import EstimateCalculatorProvider from "./providers/EstimateCalculatorProvider";
import EstimateCalculatorOutput from "./layout/EstimateCalculatorOutput";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import EstimateCalculatorMaterialFormDrawer from "./components/modals/EstimateCalculatorMaterialFormDrawer";
import { EMPTY_OBJECT } from "@/constants/utility";

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
  /** Callbacks */

  const onSubmit: EstimateCalculatorProps["onSubmit"] = (event) => {
    event.preventDefault();
  };

  const onReset: EstimateCalculatorProps["onReset"] = (event) => {
    event.preventDefault();
  };

  return (
    <EstimateCalculatorProvider>
      <Stack
        component="form"
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
