import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack } from "@mui/material";
import { getCustomer } from "@/firebase/db";
import CustomerForm from "@/components/forms/CustomerForm";

export const Route = createFileRoute("/customers/$id")({
  component: Customer,
  loader: async ({ params }) => {
    const customer = await getCustomer(params.id);
    return { customer };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Customer() {
  /** Values */

  const navigate = useNavigate();
  const { customer } = Route.useLoaderData();

  return (
    <CustomerForm
      values={customer}
      width={500}
      onSuccess={() => navigate({ to: "/customers" })}
    />
  );
}
