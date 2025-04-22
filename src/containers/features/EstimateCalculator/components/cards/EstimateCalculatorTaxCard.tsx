import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import PercentField from "@/components/fields/PercentField";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const MIN = 0;
const MAX = 100;

const EstimateCalculatorTaxCard = (props: CardProps) => {
  /** Values */

  const { methods } = useEstimateCalculator();
  const {
    formState: { errors },
    register,
  } = methods;

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
