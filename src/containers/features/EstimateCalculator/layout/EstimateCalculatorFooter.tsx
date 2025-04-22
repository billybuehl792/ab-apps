import { ButtonGroup, Stack, type StackProps } from "@mui/material";

import EstimateCalculatorResetButton from "../components/buttons/EstimateCalculatorResetButton";
import EstimateCalculatorExportButton from "../components/buttons/EstimateCalculatorExportButton";

const EstimateCalculatorFooter = (props: StackProps) => {
  return (
    <Stack bgcolor={({ palette }) => palette.background.default} {...props}>
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <EstimateCalculatorResetButton />
        <EstimateCalculatorExportButton />
      </ButtonGroup>
    </Stack>
  );
};

export default EstimateCalculatorFooter;
