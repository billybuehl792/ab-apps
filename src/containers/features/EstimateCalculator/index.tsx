import { FormProvider, useForm } from "react-hook-form";
import { Stack, type StackProps } from "@mui/material";

import EstimateCalculatorProvider from "./providers/EstimateCalculatorProvider";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import EstimateCalculatorMaterialFormDialog from "./components/modals/EstimateCalculatorMaterialFormDialog";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "@/containers/features/EstimateCalculator/constants";
import type { EstimateCalculatorValues } from "./types";

const EstimateCalculator = (props: StackProps) => {
  /** Values */

  const methods = useForm<EstimateCalculatorValues>({
    mode: "all",
    defaultValues: ESTIMATE_CALCULATOR_DEFAULT_VALUES,
    ...props,
  });

  return (
    <FormProvider {...methods}>
      <EstimateCalculatorProvider>
        <>
          <Stack sx={{ position: "relative", overflow: "auto", flexGrow: 1 }}>
            <Stack
              spacing={1}
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                p: 2,
                pb: 0,
                bgcolor: ({ palette }) => palette.background.default,
              }}
            >
              <EstimateCalculatorHeader />
              <EstimateCalculatorMeta />
            </Stack>

            <EstimateCalculatorFieldArray sx={{ flexGrow: 1, px: 2, py: 1 }} />

            <EstimateCalculatorFooter
              sx={{ position: "sticky", bottom: 0, p: 2, pt: 0 }}
            />
          </Stack>

          {/* Modals */}
          <EstimateCalculatorMaterialFormDialog />
        </>
      </EstimateCalculatorProvider>
    </FormProvider>
  );
};

export default EstimateCalculator;
