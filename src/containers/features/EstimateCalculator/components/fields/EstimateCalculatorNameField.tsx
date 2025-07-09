import { TextField, type TextFieldProps } from "@mui/material";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const MAX_LENGTH = 32;

const EstimateCalculatorNameField = (props: TextFieldProps) => {
  /** Values */

  const { methods } = useEstimateCalculator();

  return (
    <TextField
      placeholder="Name"
      required
      size="small"
      error={Boolean(methods.formState.errors.name)}
      helperText={methods.formState.errors.name?.message}
      fullWidth
      {...methods.register("name", {
        required: "Name is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default EstimateCalculatorNameField;
