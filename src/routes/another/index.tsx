import CustomerCard from "@/components/cards/CustomerCard";
import PaginatedList from "@/components/lists/PaginatedList";
import { getCustomerCount } from "@/firebase/api";
import { CircularProgress, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { customerList } from "@/firebase/queries";
import { orderBy } from "firebase/firestore";

export const Route = createFileRoute("/another/")({
  component: Another,
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async () => {
    const count = (await getCustomerCount()).data().count;
    return { count };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Another() {
  /** Values */

  const { count } = Route.useLoaderData();
  const queryOptions = customerList({ constraints: [orderBy("name")] });

  return (
    <PaginatedList
      count={count}
      queryOptions={queryOptions}
      renderItem={(doc) => <CustomerCard key={doc.id} doc={doc} />}
    />
  );
}
