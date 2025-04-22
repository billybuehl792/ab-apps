import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";

import DollarField from "@/components/fields/DollarField";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const MIN = 0;
const MAX = 10_000;

const EstimateCalculatorAdditionalCard = (props: CardProps) => {
  /** Values */

  const {
    methods: {
      register,
      formState: { errors },
    },
  } = useEstimateCalculator();

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
            min: {
              value: MIN,
              message: `Value cannot be less than ${String(MIN)}`,
            },
            max: {
              value: MAX,
              message: `Value cannot be greater than ${String(MAX)}`,
            },
            setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
          })}
        />
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorAdditionalCard;
