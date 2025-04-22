import {
  Card,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
  type Grid2Props as GridProps,
} from "@mui/material";
import useEstimateCalculator from "../hooks/useEstimateCalculator";

const EstimateCalculatorHeader = (props: GridProps) => {
  /** Values */

  const {
    methods: { watch },
  } = useEstimateCalculator();

  const fieldArray = watch("materials");
  const tax = watch("tax");
  const additional = watch("additional");

  const materialTotal = fieldArray.reduce(
    (acc, { value, count }) => acc + value * (count ?? 0),
    0
  );
  const subtotal = materialTotal + (additional ?? 0);
  const total = subtotal + (subtotal * tax) / 100;

  const items = [
    { label: "subtotal", value: subtotal.toUSD() },
    { label: "total", value: total.toUSD() },
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
