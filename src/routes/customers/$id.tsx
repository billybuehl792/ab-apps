import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack } from "@mui/material";
import CustomerForm from "@/containers/forms/CustomerForm";
import { customerCollection } from "@/firebase/collections";
import { doc, getDoc } from "firebase/firestore";

export const Route = createFileRoute("/customers/$id")({
  component: Customer,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async ({ params }) => {
    const customer = await getDoc(doc(customerCollection, params.id));
    if (!customer.exists()) throw new Error("Customer does not exist");
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
      customer={customer}
      onSuccess={() => navigate({ to: "/customers" })}
    />
  );
}
