import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button, ButtonGroup, Stack, type StackProps } from "@mui/material";
import { EstimateCalculatorFormValues } from "..";
import { sxUtils } from "@/utils/sx";

const EstimateCalculatorFooter: FC<StackProps> = (props) => {
  /** Values */

  const {
    reset,
    formState: { defaultValues },
  } = useFormContext<EstimateCalculatorFormValues>();

  /** Callbacks */

  const onReset = () => {
    const materials = defaultValues?.materials?.map((material) => ({
      ...material,
      count: null,
    }));

    reset({ ...defaultValues, materials });
  };

  return (
    <Stack
      {...props}
      sx={[
        { bgcolor: ({ palette }) => palette.background.default },
        ...sxUtils.asArray(props?.sx),
      ]}
    >
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <Button type="reset" color="error" onClick={onReset}>
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
