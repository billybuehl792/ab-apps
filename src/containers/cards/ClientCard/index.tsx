import { useState, type MouseEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  Stack,
  Typography,
  type CardProps,
  type CardContentProps,
} from "@mui/material";
import { Delete, Edit, Info, Person, Restore } from "@mui/icons-material";
import useClients from "@/hooks/useClients";
import MenuOptionListDrawer from "@/components/modals/MenuOptionListDrawer";
import { EMPTY_OBJECT } from "@/store/constants/utility";
import type { Client } from "@/store/types/clients";

interface ClientCardProps extends Omit<CardProps, "onClick"> {
  client: Client;
  disabled?: boolean;
  options?: MenuOption[];
  onClick?: (event: MouseEvent<HTMLButtonElement>, client: Client) => void;
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
}

const ClientCard = ({
  client,
  disabled: disabledProp,
  options: optionsProp,
  onClick: onClickProp,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = EMPTY_OBJECT,
  ...props
}: ClientCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  /** Values */

  const navigate = useNavigate();
  const {
    mutations: { archive, unarchive },
  } = useClients();

  const fullName = `${client.first_name} ${client.last_name}`;
  const disabled = disabledProp || archive.isPending;

  /** Callbacks */

  const onClick: CardActionAreaProps["onClick"] = (event) => {
    if (onClickProp) onClickProp(event, client);
    else handleToggleModalOpen();
  };

  const handleToggleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  /** Options */

  const options: MenuOption[] = optionsProp ?? [
    {
      id: "detail",
      label: "Detail",
      icon: <Info />,
      onClick: () => {
        void navigate({ to: `/app/clients/${client.id}` });
      },
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: () => {
        void navigate({
          to: `/app/clients/${client.id}`,
          search: { edit: true },
        });
      },
    },
    {
      id: "archive",
      render: !client.archived,
      label: "Delete",
      icon: <Delete />,
      color: "error",
      confirm: `Are you sure you want to delete ${fullName}? This action cannot be undone.`,
      onClick: () => {
        archive.mutate(client.id);
      },
    },
    {
      id: "unarchive",
      render: client.archived,
      label: "Restore",
      icon: <Restore />,
      onClick: () => {
        unarchive.mutate(client.id);
      },
    },
  ];

  return (
    <Card {...props} sx={{ opacity: client.archived ? 0.5 : 1 }}>
      <CardActionArea
        disabled={disabled}
        onClick={onClick}
        {...cardActionAreaProps}
      >
        <CardContent
          component={Stack}
          direction="row"
          spacing={2}
          alignItems="center"
          {...cardContentProps}
        >
          <Person />
          <Stack spacing={0.75} overflow="hidden">
            <Typography variant="body2" fontWeight="bold" noWrap>
              {fullName}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {client.address.text}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>

      {/* Modals */}
      {Boolean(options.length) && (
        <MenuOptionListDrawer
          title={fullName}
          options={options}
          open={modalOpen}
          onClose={handleToggleModalOpen}
        />
      )}
    </Card>
  );
};

export default ClientCard;
