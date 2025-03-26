import { createFileRoute } from "@tanstack/react-router";
import EstimateCalculator from "@/containers/EstimateCalculator";

export const Route = createFileRoute("/estimate-calculator/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
  return <EstimateCalculator />;
}
