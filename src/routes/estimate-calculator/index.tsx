import { createFileRoute, redirect } from "@tanstack/react-router";
import EstimateCalculator from "@/containers/features/EstimateCalculator";
import { firestoreQueries } from "@/firebase/queries";
import { CircularProgress, Stack } from "@mui/material";
import { orderBy } from "firebase/firestore";

export const Route = createFileRoute("/estimate-calculator/")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      firestoreQueries.getMaterialList(orderBy("value", "desc"))
    );
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
  return (
    <Stack height="100%">
      <EstimateCalculator />
    </Stack>
  );
}
