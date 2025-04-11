import { useFormContext } from "react-hook-form";
import { Stack, type StackProps, TextField } from "@mui/material";
import type { EstimateCalculatorValues } from "../types";

const EstimateCalculatorMeta = (props: StackProps) => {
  /** Values */

  const { register } = useFormContext<EstimateCalculatorValues>();

  return (
    <Stack spacing={1} {...props}>
      <TextField
        placeholder="Customer Name"
        size="small"
        fullWidth
        {...register("name")}
      />
      <TextField
        placeholder="Address"
        size="small"
        fullWidth
        {...register("address")}
      />
    </Stack>
  );
};

export default EstimateCalculatorMeta;
