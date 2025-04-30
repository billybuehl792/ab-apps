import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import useClients from "@/hooks/firebase/useClients";
import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";
import AddIconButton from "@/components/buttons/AddIconButton";
import type { Client } from "@/types/firebase";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();
  const { archive } = useClients();

  /** Callbacks */

  const handleNavigateCreateClient = () =>
    void navigate({ to: "/clients/create" });

  const handleNavigateClient = (client: Client) =>
    void navigate({ to: `/clients/${client.id}` });

  const handleEditClient = (client: Client) =>
    void navigate({
      to: `/clients/${client.id}`,
      search: { edit: true },
    });

  const handleDeleteClient = (client: Client) => {
    archive.mutate(client.id);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.5} alignItems="center" width="100%">
        <Typography variant="h6">Clients</Typography>
        <AddIconButton onClick={handleNavigateCreateClient} />
      </Stack>
      <ClientPaginatedList
        slotProps={{
          card: {
            options: (client) => [
              {
                id: "edit",
                label: "Edit",
                icon: <Edit />,
                onClick: () => {
                  handleEditClient(client);
                },
              },
              {
                id: "delete",
                label: "Delete",
                icon: <Delete />,
                onClick: () => {
                  handleDeleteClient(client);
                },
              },
            ],
            onClick: (client) => {
              handleNavigateClient(client);
            },
          },
          emptyState: {
            children: (
              <Button
                startIcon={<AddIconButton size="small" />}
                onClick={handleNavigateCreateClient}
              >
                Create Client
              </Button>
            ),
          },
        }}
      />
    </Stack>
  );
}
