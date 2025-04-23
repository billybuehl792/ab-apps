import { type ComponentProps } from "react";
import { Stack, type StackProps } from "@mui/material";

import EstimateCalculatorNameField from "../components/fields/EstimateCalculatorNameField";
import EstimateCalculatorAddressField from "../components/fields/EstimateCalculatorAddressField";
import { EMPTY_OBJECT } from "@/constants/utility";

interface EstimateCalculatorMetaProps extends StackProps {
  slotProps?: {
    nameField?: Partial<ComponentProps<typeof EstimateCalculatorNameField>>;
    addressField?: Partial<
      ComponentProps<typeof EstimateCalculatorAddressField>
    >;
  };
}

const EstimateCalculatorMeta = ({
  slotProps: {
    nameField: nameFieldProps,
    addressField: addressFieldProps,
  } = EMPTY_OBJECT,
  ...props
}: EstimateCalculatorMetaProps) => {
  return (
    <Stack spacing={1} {...props}>
      <EstimateCalculatorNameField {...nameFieldProps} />
      <EstimateCalculatorAddressField {...addressFieldProps} />
    </Stack>
  );
};

export default EstimateCalculatorMeta;
