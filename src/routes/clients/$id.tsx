import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ClientForm from "@/containers/forms/ClientForm";

import useClients from "@/hooks/firebase/useClients";
import { getClient } from "@/lib/queries/firebase/clients";
import EditIconButton from "@/components/buttons/EditIconButton";
import type { Client } from "@/types/firebase";

export const Route = createFileRoute("/clients/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { edit?: boolean } => ({
    edit: Boolean(search.edit) || undefined,
  }),
  loader: async ({ context: { queryClient }, params }) => {
    const clientSnapshot = await queryClient.fetchQuery(getClient(params.id));
    const client: Client = { id: clientSnapshot.id, ...clientSnapshot.data() };

    return { client, crumb: `${client.first_name} ${client.last_name}` };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const { client } = Route.useLoaderData();
  const { edit } = Route.useSearch();

  const navigate = useNavigate();

  /** Mutations */

  const { update } = useClients();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = async (
    data
  ) => {
    await update.mutateAsync(
      { id: client.id, ...data },
      {
        onSuccess: () => {
          handleNavigateToClient(client.id);
        },
      }
    );
  };

  const handleNavigateToClient = (id: Client["id"], edit?: boolean) =>
    void navigate({ to: `/clients/${id}`, search: { edit } });

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          {`${client.first_name} ${client.last_name}`}
        </Typography>
        {!edit && (
          <EditIconButton
            onClick={() => {
              handleNavigateToClient(client.id, true);
            }}
          />
        )}
      </Stack>

      {edit ? (
        <ClientForm
          values={client}
          submitLabel="Update"
          resetAsCancel
          onSubmit={onSubmit}
          onReset={() => void navigate({ to: `/clients/${client.id}` })}
        />
      ) : (
        <Card>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="body2">{client.address}</Typography>
              <Typography variant="body2">{client.email}</Typography>
              <Typography variant="body2">{client.phone.toPhone()}</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
