import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Skeleton, Stack, Typography } from "@mui/material";

import useClients from "@/hooks/firebase/useClients";
import { getClient } from "@/lib/queries/firebase/clients";
import EditIconButton from "@/components/buttons/EditIconButton";
import ClientDetailCard from "@/containers/cards/ClientDetailCard";
import ClientForm from "@/containers/forms/ClientForm";
import ErrorCard from "@/components/cards/ErrorCard";
import type { Client } from "@/types/firebase";
import DeleteIconButton from "@/components/buttons/DeleteIconButton";

export const Route = createFileRoute("/app/clients/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { edit?: boolean } => ({
    edit: Boolean(search.edit) || undefined,
  }),
  loader: async ({ context, params }) => {
    const clientSnapshot = await context.queryClient.fetchQuery(
      getClient(params.id)
    );
    const client: Client = { id: clientSnapshot.id, ...clientSnapshot.data() };

    return { client, crumb: `${client.first_name} ${client.last_name}` };
  },
  pendingComponent: () => (
    <Stack spacing={1}>
      <Skeleton variant="rounded" height={32} />
      <Skeleton variant="rounded" height={108} />
    </Stack>
  ),
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { client } = Route.useLoaderData();
  const { edit } = Route.useSearch();

  const navigate = useNavigate();

  const clientFullName = `${client.first_name} ${client.last_name}`;

  /** Mutations */

  const { update, archive } = useClients();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = (data) =>
    update.mutateAsync({ id: client.id, ...data });

  const onSuccess: ComponentProps<typeof ClientForm>["onSuccess"] = () =>
    void navigate({ to: `/app/clients/${client.id}` });

  const onCancel: ComponentProps<typeof ClientForm>["onReset"] = () =>
    void navigate({ to: `/app/clients/${client.id}` });

  const handleEditToggle = () => {
    void navigate({
      to: `/app/clients/${client.id}`,
      search: { edit: !edit },
    });
  };

  const handleDelete = () => {
    archive.mutate(client.id, {
      onSuccess: () => {
        void navigate({ to: "/app/clients" });
      },
    });
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          {clientFullName}
        </Typography>
        <EditIconButton active={edit} onClick={handleEditToggle} />
        <Stack direction="row" flexGrow={1} justifyContent="flex-end">
          <DeleteIconButton
            disabled={archive.isPending}
            confirm={{
              title: `Delete ${clientFullName}?`,
              description: `Are you sure you want to delete ${clientFullName}? This action is irreversible.`,
            }}
            onClick={handleDelete}
          />
        </Stack>
      </Stack>

      {edit ? (
        <ClientForm
          values={client}
          slotProps={{
            actions: { submitLabel: "Update", resetAsCancel: true },
          }}
          onSubmit={onSubmit}
          onSuccess={onSuccess}
          onReset={onCancel}
        />
      ) : (
        <ClientDetailCard client={client} />
      )}
    </Stack>
  );
}
