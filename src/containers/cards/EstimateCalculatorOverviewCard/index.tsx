import { Link } from "@tanstack/react-router";
import {
  Card,
  CardActionArea,
  CardContent,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";
import { Construction } from "@mui/icons-material";

const EstimateCalculatorOverviewCard = (props: CardProps) => {
  return (
    <Card {...props}>
      <CardActionArea LinkComponent={Link} href="/app/estimate-calculator">
        <Stack component={CardContent} spacing={2}>
          <Construction fontSize="large" />
          <Stack spacing={1}>
            <Typography variant="body2">Estimate Calculator</Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default EstimateCalculatorOverviewCard;
