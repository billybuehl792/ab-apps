import { createFileRoute, redirect } from "@tanstack/react-router";
import EstimateCalculator from "@/containers/features/EstimateCalculator";
import { Stack } from "@mui/material";

export const Route = createFileRoute("/estimate-calculator")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
  },
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
  return (
    <Stack height="100%">
      <EstimateCalculator />
    </Stack>
  );
}
