import { Stack, type StackProps } from "@mui/material";
import EstimateCalculatorNameField from "../components/fields/EstimateCalculatorNameField";
import EstimateCalculatorAddressField from "../components/fields/EstimateCalculatorAddressField";
import EstimateCalculatorCategorySelectField from "../components/fields/EstimateCalculatorCategorySelectField";

const EstimateCalculatorMeta = (props: StackProps) => {
  return (
    <Stack spacing={1} {...props}>
      <EstimateCalculatorNameField />
      <EstimateCalculatorAddressField />
      <EstimateCalculatorCategorySelectField size="small" />
    </Stack>
  );
};

export default EstimateCalculatorMeta;
