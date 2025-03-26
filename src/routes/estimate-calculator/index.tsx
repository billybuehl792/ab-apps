import { createFileRoute } from "@tanstack/react-router";
import EstimateCalculator from "@/containers/EstimateCalculator";
import { firestoreQueries } from "@/firebase/queries";
import { CircularProgress } from "@mui/material";
import { orderBy } from "firebase/firestore";

export const Route = createFileRoute("/estimate-calculator/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
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
  return <EstimateCalculator />;
}
