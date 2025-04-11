import { useFormContext } from "react-hook-form";
import { Button, ButtonGroup, Stack, type StackProps } from "@mui/material";

import { sxAsArray } from "@/utils/sx";
import type { EstimateCalculatorValues } from "../types";

const EstimateCalculatorFooter = (props: StackProps) => {
  /** Values */

  const { reset } = useFormContext<EstimateCalculatorValues>();

  return (
    <Stack
      {...props}
      sx={[
        { bgcolor: ({ palette }) => palette.background.default },
        ...sxAsArray(props?.sx),
      ]}
    >
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <Button
          type="reset"
          color="error"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
        <Button variant="contained" color="primary">
          Export
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default EstimateCalculatorFooter;
