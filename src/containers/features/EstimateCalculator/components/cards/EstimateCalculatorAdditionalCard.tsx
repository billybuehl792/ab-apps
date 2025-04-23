import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";

import EstimateCalculatorAdditionalField from "../fields/EstimateCalculatorAdditionalField";

const EstimateCalculatorAdditionalCard = (props: CardProps) => {
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
        <EstimateCalculatorAdditionalField />
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorAdditionalCard;
