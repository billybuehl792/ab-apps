import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import PercentField from "@/components/fields/PercentField";
import type { EstimateCalculatorValues } from "../../types";

const MIN = 0;
const MAX = 100;

const EstimateCalculatorTaxCard: FC<CardProps> = (props) => {
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
          Tax
        </Typography>
        <PercentField
          size="small"
          error={!!errors.tax}
          sx={{ width: 110 }}
          {...register("tax", {
            min: {
              value: MIN,
              message: `Value cannot be less than ${String(MIN)}%`,
            },
            max: {
              value: MAX,
              message: `Value cannot be greater than ${String(MAX)}%`,
            },
            setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
          })}
        />
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorTaxCard;
