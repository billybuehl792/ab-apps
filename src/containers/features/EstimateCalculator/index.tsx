import { Stack, type StackProps } from "@mui/material";

import EstimateCalculatorProvider from "./providers/EstimateCalculatorProvider";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import EstimateCalculatorMaterialFormDialog from "./components/modals/EstimateCalculatorMaterialFormDialog";

const EstimateCalculator = (props: StackProps) => {
  return (
    <EstimateCalculatorProvider>
      <>
        <Stack
          component="form"
          position="relative"
          overflow="auto"
          flexGrow={1}
          {...props}
        >
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
  );
};

export default EstimateCalculator;
