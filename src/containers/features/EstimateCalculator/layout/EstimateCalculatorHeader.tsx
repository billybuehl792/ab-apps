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
  const tax = watch("tax") || 0;

  const subtotal = fieldArray.reduce((acc, { value, count }) => {
    return acc + value * (Number(count) || 0);
  }, 0);
  const total = subtotal + (subtotal * tax) / 100;

  const subtotalUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal);
  const totalUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  const items = [
    { label: "Subtotal", value: subtotalUSD },
    { label: "Total", value: totalUSD },
  ];

  return (
    <Grid container spacing={1} {...props}>
      {items.map(({ label, value }) => (
        <Grid key={label} component={Card} size={{ xs: 6 }}>
          <CardContent component={Stack} sx={{ padding: 1 }}>
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="h5">{value}</Typography>
          </CardContent>
        </Grid>
      ))}
    </Grid>
  );
};

export default EstimateCalculatorHeader;
