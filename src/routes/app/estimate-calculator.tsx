import { createFileRoute } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import EstimateCalculator from "@/containers/features/EstimateCalculator";

export const Route = createFileRoute("/app/estimate-calculator")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack height="100%" overflow="auto">
      <EstimateCalculator />
    </Stack>
  );
}
