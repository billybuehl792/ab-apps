import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";

import useClients from "@/hooks/firebase/useClients";
import ClientForm from "@/containers/forms/ClientForm";

export const Route = createFileRoute("/clients/create")({
  component: RouteComponent,
  loader: () => ({ crumb: "Create" }),
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();
  const { create } = useClients();

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Create Client</Typography>
      <ClientForm
        disableReset
        submitLabel="Create"
        onSubmit={async (formData) => {
          await create.mutateAsync(formData, {
            onSuccess: () => navigate({ to: "/clients" }),
          });
        }}
      />
    </Stack>
  );
}
