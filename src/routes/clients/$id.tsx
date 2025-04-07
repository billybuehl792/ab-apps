import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import ClientForm from "@/containers/forms/ClientForm";
import EditIconButton from "@/components/buttons/EditIconButton";
import type { Client } from "@/firebase/types";

export const Route = createFileRoute("/clients/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { edit?: boolean } => ({
    edit: Boolean(search.edit) || undefined,
  }),
  loader: async ({ context, params }) => {
    const clientSnapshot = await context.queryClient.fetchQuery(
      firestoreQueries.getClient(params.id)
    );
    const client: Client = { id: clientSnapshot.id, ...clientSnapshot.data() };
    const clientFullName = `${client.first_name} ${client.last_name}`;

    return { client, crumb: clientFullName.toTitleCase() };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const { client } = Route.useLoaderData();
  const { edit } = Route.useSearch();

  const navigate = useNavigate();

  const clientFullName = `${client.first_name} ${client.last_name}`;

  /** Mutations */

  const { update } = firestoreMutations.useClientMutations();
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          {clientFullName.toTitleCase()}
        </Typography>
        {!edit && (
          <EditIconButton
            onClick={() =>
              navigate({ to: `/clients/${client.id}`, search: { edit: true } })
            }
          />
        )}
      </Stack>

      {edit ? (
        <ClientForm
          values={client}
          submitLabel="Update"
          resetAsCancel
          onSubmit={async (formData) => {
            await update.mutateAsync(
              { id: client.id, ...formData },
              {
                onSuccess: () => navigate({ to: `/clients/${client.id}` }),
              }
            );
          }}
          onReset={() => navigate({ to: `/clients/${client.id}` })}
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
