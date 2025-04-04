import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import ClientForm from "@/containers/forms/ClientForm";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import type { Client } from "@/firebase/types";

export const Route = createFileRoute("/clients/edit/$id")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
  },
  loader: async ({ context, params }) => {
    const clientSnapshot = await context.queryClient.fetchQuery(
      firestoreQueries.getClient(params.id)
    );
    const client: Client = { id: clientSnapshot.id, ...clientSnapshot.data() };

    return { client };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const { client } = Route.useLoaderData();
  const navigate = useNavigate();
  const { update, remove } = firestoreMutations.useClientMutations();

  const clientFullName = `${client.first_name} ${client.last_name}`;

  const options: MenuOption[] = [
    {
      id: "delete",
      label: "Delete",
      icon: <Delete />,
      onClick: () => {
        remove.mutate(client.id, {
          onSuccess: () => navigate({ to: "/clients" }),
        });
      },
    },
  ];

  return (
    <Stack spacing={1} p={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          Edit {clientFullName.toTitleCase()}
        </Typography>
        <MenuOptionsIconButton options={options} />
      </Stack>
      <ClientForm
        values={client}
        submitLabel="Update"
        resetLabel="Cancel"
        onSubmit={async (formData) => {
          await update.mutateAsync(
            { id: client.id, ...formData },
            { onSuccess: () => navigate({ to: "/clients" }) }
          );
        }}
      />
    </Stack>
  );
}
