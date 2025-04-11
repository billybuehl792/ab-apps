import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
  type Grid2Props as GridProps,
} from "@mui/material";
import type { EstimateCalculatorValues } from "../types";

const EstimateCalculatorHeader = (props: GridProps) => {
  /** Values */

  const { watch } = useFormContext<EstimateCalculatorValues>();

  const fieldArray = watch("materials");
  const tax = watch("tax") || 0;
  const additional = watch("additional") || 0;

  const materialTotal = fieldArray.reduce((acc, { value, count }) => {
    return acc + value * (Number(count) || 0);
  }, 0);
  const subtotal = materialTotal + additional;
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
    { label: "subtotal", value: subtotalUSD },
    { label: "total", value: totalUSD },
  ];

  return (
    <Grid container spacing={1} {...props}>
      {items.map(({ label, value }) => {
        const isTotal = label === "total";

        return (
          <Grid key={label} component={Card} size={{ xs: 6 }}>
            <CardContent component={Stack} sx={{ padding: 1 }}>
              <Typography variant="subtitle2">{label.toTitleCase()}</Typography>
              <Typography
                variant="h5"
                sx={{
                  color: ({ palette }) =>
                    !isTotal ? palette.grey[500] : undefined,
                }}
              >
                {value}
              </Typography>
            </CardContent>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EstimateCalculatorHeader;
