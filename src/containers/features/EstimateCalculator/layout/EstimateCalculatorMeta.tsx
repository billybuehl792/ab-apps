import { Stack, type StackProps } from "@mui/material";
import EstimateCalculatorNameField from "../components/fields/EstimateCalculatorNameField";
import EstimateCalculatorAddressField from "../components/fields/EstimateCalculatorAddressField";

const EstimateCalculatorMeta = (props: StackProps) => {
  return (
    <Stack spacing={1} {...props}>
      <EstimateCalculatorNameField />
      <EstimateCalculatorAddressField />
    </Stack>
  );
};

export default EstimateCalculatorMeta;
