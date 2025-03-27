import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
  type Grid2Props as GridProps,
} from "@mui/material";
import { type EstimateCalculatorFormValues } from "..";

const EstimateCalculatorHeader: FC<GridProps> = (props) => {
  /** Values */

  const { watch } = useFormContext<EstimateCalculatorFormValues>();

  const fieldArray = watch("materials");

  const total = fieldArray.reduce((acc, { value, count = 0 }) => {
    return acc + value * count;
  }, 0);
  const totalUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  const items = [
    { label: "Total", value: totalUSD },
    { label: "Subtotal", value: 50 },
  ];

  return (
    <Grid container spacing={1} {...props}>
      {items.map(({ label, value }) => (
        <Grid
          key={label}
          component={Card}
          variant="outlined"
          size={{ xs: 12, sm: 6 }}
        >
          <CardContent component={Stack}>
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="h5">{value}</Typography>
          </CardContent>
        </Grid>
      ))}
    </Grid>
  );
};

export default EstimateCalculatorHeader;
