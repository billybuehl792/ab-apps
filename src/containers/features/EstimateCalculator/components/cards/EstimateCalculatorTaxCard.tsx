import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";

import EstimateCalculatorTaxField from "../fields/EstimateCalculatorTaxField";

const EstimateCalculatorTaxCard = (props: CardProps) => {
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
        <EstimateCalculatorTaxField />
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorTaxCard;
