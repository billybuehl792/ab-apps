import { type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Stack, type StackProps } from "@mui/material";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "@/constants/forms";
import type { Material } from "@/firebase/types";

export interface EstimateCalculatorValues {
  name: string;
  address: string;
  tax: number;
  materials: (Material & { count: number | null })[];
}

const EstimateCalculator: FC<StackProps> = (props) => {
  /** Values */

  const methods = useForm<EstimateCalculatorValues>({
    mode: "all",
    defaultValues: ESTIMATE_CALCULATOR_DEFAULT_VALUES,
    ...props,
  });

  return (
    <FormProvider {...methods}>
      <Stack sx={{ position: "relative", overflow: "auto", flexGrow: 1 }}>
        <Stack
          spacing={2}
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

        <EstimateCalculatorFieldArray sx={{ flexGrow: 1, p: 2, pb: 1 }} />

        <EstimateCalculatorFooter
          sx={{ position: "sticky", bottom: 0, p: 2, pt: 0 }}
        />
      </Stack>
    </FormProvider>
  );
};

export default EstimateCalculator;
