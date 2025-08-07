import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@mui/material";
import EstimateCalculator from "@/containers/features/EstimateCalculator";

export const Route = createFileRoute("/app/estimate-calculator")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maxWidth="md" disableGutters sx={{ height: "100%" }}>
      <EstimateCalculator height="100%" />
    </Container>
  );
}
