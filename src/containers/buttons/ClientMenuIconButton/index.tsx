import { type ComponentProps } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Delete, Edit, Info, Restore } from "@mui/icons-material";
import useConfirm from "@/store/hooks/useConfirm";
import useClients from "@/store/hooks/useClients";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import type { Client } from "@/store/types/clients";

interface ClientMenuIconButtonProps
  extends Partial<ComponentProps<typeof MenuOptionsIconButton>> {
  client: Client;
}

const ClientMenuIconButton = ({
  client,
  options: optionsProp,
  ...props
}: ClientMenuIconButtonProps) => {
  /** Values */

  const navigate = useNavigate();
  const location = useLocation();
  const clients = useClients();
  const { confirm } = useConfirm();

  const fullName = `${client.first_name} ${client.last_name}`;

  const isEditing =
    location.pathname === `/app/clients/${client.id}` &&
    Boolean(location.search.edit);

  const options: MenuOption[] = optionsProp ?? [
    {
      id: "detail",
      render: location.pathname !== `/app/clients/${client.id}`,
      label: "Detail",
      icon: <Info />,
      link: { to: "/app/clients/$id", params: { id: client.id } },
    },
    {
      id: "edit",
      render: !client.archived,
      disabled: isEditing,
      label: "Edit",
      icon: <Edit />,
      link: {
        to: "/app/clients/$id",
        params: { id: client.id },
        search: { edit: true },
      },
    },
    {
      id: "archive",
      render: !client.archived,
      label: "Delete",
      icon: <Delete />,
      color: "error",
      onClick: () =>
        void confirm({
          title: `Delete ${fullName}?`,
          message: `Are you sure you want to delete ${fullName}? This action cannot be undone.`,
        }).then((confirmed) => {
          if (confirmed)
            clients.mutations.archive.mutate(client.id, {
              onSuccess: () => void navigate({ to: "/app/clients" }),
            });
        }),
    },
    {
      id: "unarchive",
      render: client.archived,
      label: "Restore",
      icon: <Restore />,
      onClick: () => {
        clients.mutations.restore.mutate(client.id);
      },
    },
  ];

  return <MenuOptionsIconButton options={options} {...props} />;
};

export default ClientMenuIconButton;
