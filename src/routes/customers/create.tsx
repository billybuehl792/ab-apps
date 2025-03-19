import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CustomerForm from "@/components/forms/CustomerForm";

export const Route = createFileRoute("/customers/create")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();

  return (
    <CustomerForm
      width={500}
      onSuccess={(customer) => navigate({ to: `/customers/${customer.id}` })}
    />
  );
}
