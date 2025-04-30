import { type ComponentProps } from "react";
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

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = (data) =>
    create.mutateAsync(data, {
      onSuccess: ({ id }) => void navigate({ to: `/clients/${id}` }),
    });

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Create Client</Typography>
      <ClientForm
        slotProps={{ actions: { disableReset: true, submitLabel: "Create" } }}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
