import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Skeleton, Stack, Typography } from "@mui/material";
import ClientForm from "@/containers/forms/ClientForm";

import useClients from "@/hooks/firebase/useClients";
import { getClient } from "@/lib/queries/firebase/clients";
import EditIconButton from "@/components/buttons/EditIconButton";
import ClientDetailCard from "@/containers/cards/ClientDetailCard";
import ErrorCard from "@/components/cards/ErrorCard";
import type { Client } from "@/types/firebase";

export const Route = createFileRoute("/clients/$id")({
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

  /** Mutations */

  const { update } = useClients();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = (data) =>
    update.mutateAsync({ id: client.id, ...data });

  const onSuccess: ComponentProps<typeof ClientForm>["onSuccess"] = () =>
    void navigate({ to: `/clients/${client.id}` });

  const onCancel: ComponentProps<typeof ClientForm>["onReset"] = () =>
    void navigate({ to: `/clients/${client.id}` });

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          {`${client.first_name} ${client.last_name}`}
        </Typography>
        {!edit && (
          <EditIconButton
            onClick={() => {
              void navigate({
                to: `/clients/${client.id}`,
                search: { edit: true },
              });
            }}
          />
        )}
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
