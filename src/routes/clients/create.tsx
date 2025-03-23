import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ClientForm from "@/containers/forms/ClientForm";
import { Stack } from "@mui/material";

export const Route = createFileRoute("/clients/create")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();

  return <ClientForm onSuccess={() => navigate({ to: "/clients" })} />;
}
