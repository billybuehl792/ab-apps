import {
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";

interface EstimateCalculatorHeaderCardProps extends CardProps {
  label: string;
  value: string;
}

const EstimateCalculatorHeaderCard = ({
  label,
  value,
  ...props
}: EstimateCalculatorHeaderCardProps) => {
  return (
    <Card {...props}>
      <CardContent component={Stack}>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default EstimateCalculatorHeaderCard;
