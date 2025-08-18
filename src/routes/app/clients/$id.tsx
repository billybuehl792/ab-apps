import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import { clientQueries } from "@/store/queries/clients";
import useClients from "@/store/hooks/useClients";
import ClientDetailCard from "@/containers/cards/ClientDetailCard";
import ClientForm from "@/containers/forms/ClientForm";
import ClientMenuIconButton from "@/containers/buttons/ClientMenuIconButton";
import ErrorCard from "@/components/cards/ErrorCard";
import StatusWrapper from "@/components/layout/StatusWrapper";
import type { Client } from "@/store/types/clients";

export const Route = createFileRoute("/app/clients/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { edit?: boolean } => ({
    edit: Boolean(search.edit) || undefined,
  }),
  loader: async ({ context, params }) => {
    if (!context.auth.profile.company?.id)
      throw new Error("Unauthorized. User is not assigned to a Company");
    const doc = await context.queryClient.fetchQuery(
      clientQueries.detail(context.auth.profile.company.id, params.id)
    );
    const client: Client = { id: doc.id, ...doc.data() };

    return { client, crumb: `${client.first_name} ${client.last_name}` };
  },
  pendingComponent: () => (
    <StatusWrapper loading loadingDescription="loading client..." />
  ),
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { client } = Route.useLoaderData();
  const { edit } = Route.useSearch();
  const navigate = useNavigate();
  const clients = useClients();

  const clientFullName = `${client.first_name} ${client.last_name}`;

  /** Mutations */

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = (data) =>
    clients.mutations.update.mutateAsync({ id: client.id, ...data });

  const onSuccess: ComponentProps<typeof ClientForm>["onSuccess"] = () =>
    void navigate({ to: `/app/clients/${client.id}` });

  const onCancel: ComponentProps<typeof ClientForm>["onReset"] = () =>
    void navigate({ to: `/app/clients/${client.id}` });

  return (
    <Stack spacing={2} p={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          {clientFullName}
        </Typography>
        <Stack direction="row" flexGrow={1} justifyContent="flex-end">
          <ClientMenuIconButton client={client} />
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
