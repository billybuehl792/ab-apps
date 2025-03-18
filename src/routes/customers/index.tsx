import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getCustomerList } from "@/firebase/db";
import { CircularProgress, Stack } from "@mui/material";
import CustomerCard from "@/components/cards/CustomerCard";

export const Route = createFileRoute("/customers/")({
  component: Customers,
  loader: async () => {
    const customers = await getCustomerList();
    return { customers };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: () => <Stack>Error loading customers</Stack>,
});

function Customers() {
  /** Values */

  const navigate = useNavigate();
  const { customers } = Route.useLoaderData();

  /** Callbacks */

  const handleNavigateCustomer = (id: string) =>
    navigate({ to: `/customers/${id}` });

  return (
    <Stack spacing={2}>
      <Stack>Customers:</Stack>
      <Stack spacing={1}>
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onClick={() => handleNavigateCustomer(customer.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
