import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Stack, type StackProps, TextField } from "@mui/material";
import type { EstimateCalculatorValues } from "../types";

const EstimateCalculatorMeta: FC<StackProps> = (props) => {
  /** Values */

  const { register } = useFormContext<EstimateCalculatorValues>();

  return (
    <Stack spacing={2} {...props}>
      <TextField
        label="Customer Name"
        size="small"
        fullWidth
        {...register("name")}
      />
      <TextField
        label="Address"
        size="small"
        fullWidth
        {...register("address")}
      />
    </Stack>
  );
};

export default EstimateCalculatorMeta;
