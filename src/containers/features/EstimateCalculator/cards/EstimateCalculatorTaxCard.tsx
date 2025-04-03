import { type FC } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import PercentField from "@/components/fields/PercentField";
import { useFormContext } from "react-hook-form";
import { EstimateCalculatorValues } from "..";

const EstimateCalculatorTaxCard: FC<CardProps> = (props) => {
  /** Values */

  const { register } = useFormContext<EstimateCalculatorValues>();

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
        <PercentField size="small" sx={{ width: 110 }} {...register("tax")} />
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorTaxCard;
