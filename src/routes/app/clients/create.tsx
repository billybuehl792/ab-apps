import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import useClients from "@/store/hooks/useClients";
import ClientForm from "@/containers/forms/ClientForm";

export const Route = createFileRoute("/app/clients/create")({
  component: RouteComponent,
  loader: () => ({ crumb: "Create" }),
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();
  const clients = useClients();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = (data) =>
    clients.mutations.create.mutateAsync(data, {
      onSuccess: ({ id }) => void navigate({ to: `/app/clients/${id}` }),
    });

  const onCancel: ComponentProps<typeof ClientForm>["onReset"] = () =>
    void navigate({ to: "/app/clients" });

  return (
    <Stack spacing={1} p={2}>
      <Typography variant="h6">Create Client</Typography>
      <ClientForm
        slotProps={{ actions: { resetAsCancel: true, submitLabel: "Create" } }}
        onSubmit={onSubmit}
        onReset={onCancel}
      />
    </Stack>
  );
}
