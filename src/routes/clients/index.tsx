import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Delete, Edit } from "@mui/icons-material";

import useClients from "@/hooks/firebase/useClients";
import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";
import CreateClientLink from "@/containers/links/CreateClientLink";
import type { Client } from "@/types/firebase";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();
  const { archive } = useClients();

  /** Callbacks */

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
          children: <CreateClientLink />,
        },
      }}
    />
  );
}
