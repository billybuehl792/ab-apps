import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import type { Client } from "@/firebase/types";

export const Route = createFileRoute("/clients/$id")({
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
  const { remove } = firestoreMutations.useClientMutations();
  const navigate = useNavigate();

  const clientFullName = `${client.first_name} ${client.last_name}`;

  const options: MenuOption[] = [
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: () => navigate({ to: `/clients/edit/${client.id}` }),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Delete />,
      onClick: () =>
        remove.mutate(client.id, {
          onSuccess: () => navigate({ to: "/clients" }),
        }),
    },
  ];

  return (
    <Stack spacing={1} p={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" noWrap>
          {clientFullName.toTitleCase()}
        </Typography>
        <MenuOptionsIconButton options={options} />
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="body2">{client.address}</Typography>
            <Typography variant="body2">{client.email}</Typography>
            <Typography variant="body2">{client.phone.toPhone()}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
