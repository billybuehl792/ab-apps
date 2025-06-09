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
      placeholder="Name"
      required
      size="small"
      error={Boolean(errors.name)}
      helperText={errors.name?.message}
      fullWidth
      {...register("name", {
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
