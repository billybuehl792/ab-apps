import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import ClientForm from "@/containers/forms/ClientForm";
import { firestoreMutations } from "@/firebase/mutations";

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
  const { create } = firestoreMutations.useClientMutations();

  return (
    <ClientForm
      onSubmit={(formData) =>
        create.mutate(formData, {
          onSuccess: () => navigate({ to: "/clients" }),
        })
      }
    />
  );
}
