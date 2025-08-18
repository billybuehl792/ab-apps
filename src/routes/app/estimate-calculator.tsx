import { createFileRoute } from "@tanstack/react-router";
import EstimateCalculator from "@/containers/features/EstimateCalculator";

export const Route = createFileRoute("/app/estimate-calculator")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EstimateCalculator width="100%" height="100%" overflow="auto" />;
}
