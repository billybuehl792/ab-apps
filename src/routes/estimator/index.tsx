import { createFileRoute } from "@tanstack/react-router";
import { getDocs, orderBy, query } from "firebase/firestore";
import { materialCollection } from "@/firebase/collections";
import EstimateCalculator from "@/containers/EstimateCalculator";

export const Route = createFileRoute("/estimator/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async ({ context }) => {
    const materials = await context.queryClient.fetchQuery({
      queryKey: [materialCollection.path],
      queryFn: () =>
        getDocs(query(materialCollection, orderBy("value", "desc"))),
    });

    return { materials };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
  return <EstimateCalculator />;
}
