import { type ComponentProps } from "react";
import {
  ButtonGroup,
  type ButtonGroupProps,
  Stack,
  type StackProps,
} from "@mui/material";

import EstimateCalculatorResetButton from "../components/buttons/EstimateCalculatorResetButton";
import EstimateCalculatorExportButton from "../components/buttons/EstimateCalculatorExportButton";
import { EMPTY_OBJECT } from "@/constants/utility";

interface EstimateCalculatorFooterProps extends StackProps {
  slotProps?: {
    buttonGroup?: ButtonGroupProps;
    exportButton?: Partial<
      ComponentProps<typeof EstimateCalculatorExportButton>
    >;
    resetButton?: Partial<ComponentProps<typeof EstimateCalculatorResetButton>>;
  };
}

const EstimateCalculatorFooter = ({
  slotProps: {
    buttonGroup: buttonGroupProps,
    exportButton: exportButtonProps,
    resetButton: resetButtonProps,
  } = EMPTY_OBJECT,
  ...props
}: EstimateCalculatorFooterProps) => {
  return (
    <Stack {...props}>
      <ButtonGroup
        variant="outlined"
        size="large"
        fullWidth
        {...buttonGroupProps}
      >
        <EstimateCalculatorResetButton {...resetButtonProps} />
        <EstimateCalculatorExportButton {...exportButtonProps} />
      </ButtonGroup>
    </Stack>
  );
};

export default EstimateCalculatorFooter;
