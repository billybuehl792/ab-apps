import { type ComponentProps } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Delete, Edit, Info, Restore } from "@mui/icons-material";
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

  const fullName = `${client.first_name} ${client.last_name}`;

  const isEditing =
    location.pathname === `/app/clients/${client.id}` &&
    Boolean(location.search.edit);

  const options: MenuOption[] = optionsProp ?? [
    {
      id: "detail",
      label: "Detail",
      icon: <Info />,
      onClick: () => void navigate({ to: `/app/clients/${client.id}` }),
    },
    {
      id: "edit",
      render: !client.archived,
      disabled: isEditing,
      label: "Edit",
      icon: <Edit />,
      onClick: () =>
        void navigate({
          to: `/app/clients/${client.id}`,
          search: { edit: true },
        }),
    },
    {
      id: "archive",
      render: !client.archived,
      label: "Delete",
      icon: <Delete />,
      color: "error",
      confirm: `Are you sure you want to delete ${fullName}? This action cannot be undone.`,
      onClick: () => {
        clients.mutations.archive.mutate(client.id);
      },
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
