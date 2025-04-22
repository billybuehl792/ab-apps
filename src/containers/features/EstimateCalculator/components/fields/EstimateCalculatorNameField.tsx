import { TextField, type TextFieldProps } from "@mui/material";

import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const MAX_LENGTH = 32;

const EstimateCalculatorNameField = (props: TextFieldProps) => {
  /** Values */

  const {
    methods: {
      formState: { errors },
      register,
    },
  } = useEstimateCalculator();

  return (
    <TextField
      placeholder="First Name"
      error={Boolean(errors.name)}
      helperText={errors.name?.message}
      fullWidth
      {...register("name", {
        required: "First name is required",
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
