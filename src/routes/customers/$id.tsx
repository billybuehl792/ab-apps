import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack } from "@mui/material";
import { getCustomer } from "@/firebase/api";
import CustomerForm from "@/containers/forms/CustomerForm";

export const Route = createFileRoute("/customers/$id")({
  component: Customer,
  loader: async ({ params }) => {
    const customerDoc = await getCustomer(params.id);
    return { customerDoc };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Customer() {
  /** Values */

  const navigate = useNavigate();
  const { customerDoc } = Route.useLoaderData();

  return (
    <CustomerForm
      customer={customerDoc}
      onSuccess={() => navigate({ to: "/customers" })}
    />
  );
}
