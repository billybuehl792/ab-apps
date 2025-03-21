import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CustomerForm from "@/containers/forms/CustomerForm";

export const Route = createFileRoute("/customers/create")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();

  return <CustomerForm onSuccess={() => navigate({ to: "/customers" })} />;
}
