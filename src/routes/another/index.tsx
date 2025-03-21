import CustomerCard from "@/containers/cards/CustomerCard";
import PaginatedList from "@/components/lists/PaginatedList";
import { getCustomerCount, getCustomerList } from "@/firebase/api";
import { CircularProgress, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { orderBy } from "firebase/firestore";
import { queryOptions } from "@tanstack/react-query";
import { getQueryKey } from "@/utils/queries";

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
  const q = queryOptions({
    queryKey: getQueryKey("customerList", { constraints: [orderBy("name")] }),
    queryFn: ({ queryKey: [_, options] }) => getCustomerList(options),
  });

  return (
    <PaginatedList
      count={count}
      queryOptions={q}
      renderItem={(customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      )}
    />
  );
}
