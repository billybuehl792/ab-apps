import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import DollarField from "@/components/fields/DollarField";
import type { EstimateCalculatorValues } from "../../types";

const MIN = 0;
const MAX = 10_000;

const EstimateCalculatorAdditionalCard: FC<CardProps> = (props) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<EstimateCalculatorValues>();

  return (
    <Card {...props}>
      <CardContent
        component={Stack}
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="end"
        justifyItems="flex-end"
      >
        <Typography variant="body1" noWrap>
          Additional Costs
        </Typography>
        <DollarField
          size="small"
          error={!!errors.additional}
          sx={{ width: 120 }}
          {...register("additional", {
            min: { value: MIN, message: `Value cannot be less than ${MIN}` },
            max: { value: MAX, message: `Value cannot be greater than ${MAX}` },
            setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
          })}
        />
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorAdditionalCard;
