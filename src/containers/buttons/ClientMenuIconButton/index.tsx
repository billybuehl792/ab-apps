import { type ComponentProps } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Delete, Edit, Info, Restore } from "@mui/icons-material";
import useConfirm from "@/store/hooks/useConfirm";
import useClients from "@/store/hooks/useClients";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import type { Client } from "@/store/types/clients";
import { useQuery } from "@tanstack/react-query";

interface ClientMenuIconButtonProps
  extends Partial<ComponentProps<typeof MenuOptionsIconButton>> {
  client: Client | string;
}

const ClientMenuIconButton = ({
  client: clientProp,
  options: optionsProp,
  ...props
}: ClientMenuIconButtonProps) => {
  /** Values */

  const clientId = typeof clientProp === "string" ? clientProp : clientProp.id;

  const navigate = useNavigate();
  const location = useLocation();
  const clients = useClients();
  const { confirm } = useConfirm();

  /** Queries */

  const clientQuery = useQuery({
    ...clients.queries.detail(clientId),
    select: (data) => ({ id: data.id, ...data.data() }),
    enabled: typeof clientProp === "string",
  });
  const client = typeof clientProp === "string" ? clientQuery.data : clientProp;

  /** Data */

  const fullName = client ? `${client.first_name} ${client.last_name}` : "";
  const isArchived = client?.archived ?? false;
  const isEditing =
    location.pathname === `/app/clients/${clientId}` &&
    Boolean(location.search.edit);

  const options: MenuOption[] = optionsProp ?? [
    {
      id: "detail",
      render: location.pathname !== `/app/clients/${clientId}`,
      label: "Detail",
      icon: <Info />,
      link: { to: "/app/clients/$id", params: { id: clientId } },
    },
    {
      id: "edit",
      render: !isArchived,
      disabled: isEditing,
      label: "Edit",
      icon: <Edit />,
      link: {
        to: "/app/clients/$id",
        params: { id: clientId },
        search: { edit: true },
      },
    },
    {
      id: "archive",
      render: !client?.archived,
      label: "Delete",
      icon: <Delete />,
      color: "error",
      onClick: () =>
        void confirm({
          title: `Delete ${fullName}?`,
          message: `Are you sure you want to delete ${fullName}? This action cannot be undone.`,
        }).then((confirmed) => {
          if (confirmed)
            clients.mutations.archive.mutate(clientId, {
              onSuccess: () => void navigate({ to: "/app/clients" }),
            });
        }),
    },
    {
      id: "unarchive",
      render: isArchived,
      label: "Restore",
      icon: <Restore />,
      onClick: () => {
        clients.mutations.restore.mutate(clientId);
      },
    },
  ];

  return (
    <MenuOptionsIconButton
      options={options}
      disabled={clientQuery.isLoading}
      {...props}
    />
  );
};

export default ClientMenuIconButton;
