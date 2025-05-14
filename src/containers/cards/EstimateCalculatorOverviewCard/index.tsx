import { useNavigate } from "@tanstack/react-router";
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
  /** Values */

  const navigate = useNavigate();

  /** Callbacks */

  const handleOnClick = () => {
    void navigate({ to: "/app/estimate-calculator" });
  };

  return (
    <Card {...props}>
      <CardActionArea onClick={handleOnClick}>
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
