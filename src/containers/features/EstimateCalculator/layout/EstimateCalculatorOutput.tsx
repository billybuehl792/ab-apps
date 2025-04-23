import { Grid2 as Grid, type Grid2Props as GridProps } from "@mui/material";

import useEstimateCalculator from "../hooks/useEstimateCalculator";
import EstimateCalculatorHeaderCard from "../components/cards/EstimateCalculatorHeaderCard";

const EstimateCalculatorOutput = (props: GridProps) => {
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

  return (
    <Grid container spacing={1} {...props}>
      <Grid
        component={EstimateCalculatorHeaderCard}
        label="Subtotal"
        value={subtotal.toUSD()}
        size="grow"
      />
      <Grid
        component={EstimateCalculatorHeaderCard}
        label="Total"
        value={total.toUSD()}
        size="grow"
      />
    </Grid>
  );
};

export default EstimateCalculatorOutput;
