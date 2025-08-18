import { Button, type ButtonProps } from "@mui/material";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const EstimateCalculatorResetButton = (props: ButtonProps) => {
  /** Values */

  const { methods } = useEstimateCalculator();

  /** Callbacks */

  const onReset: ButtonProps["onClick"] = (event) => {
    event.preventDefault();
    methods.reset();
  };

  return (
    <Button type="reset" color="error" onClick={onReset} {...props}>
      Reset
    </Button>
  );
};

export default EstimateCalculatorResetButton;
