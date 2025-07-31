import { type MouseEvent } from "react";
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
  CardActions,
} from "@mui/material";
import { Delete, Edit, Info, Person, Restore } from "@mui/icons-material";
import useClients from "@/hooks/useClients";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import type { Client } from "@/store/types/clients";

interface ClientListCardProps extends Omit<CardProps, "onClick"> {
  client: Client;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>, client: Client) => void;
  options?: MenuOption[];
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
}

const ClientListCard = ({
  client,
  disabled,
  onClick: onClickProp,
  options: optionsProp,
  slotProps,
  ...props
}: ClientListCardProps) => {
  /** Values */

  const navigate = useNavigate();
  const clients = useClients();
  const fullName = `${client.first_name} ${client.last_name}`;

  /** Callbacks */

  const onClick: CardActionAreaProps["onClick"] = (event) => {
    if (onClickProp) onClickProp(event, client);
    else void navigate({ to: `/app/clients/${client.id}` });
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

  return (
    <Stack
      component={Card}
      direction="row"
      position="relative"
      {...props}
      sx={{ opacity: client.archived ? 0.5 : 1 }}
    >
      <CardActionArea
        disabled={disabled}
        onClick={onClick}
        {...slotProps?.cardActionArea}
      >
        <CardContent
          component={Stack}
          direction="row"
          spacing={2}
          mr={7.5}
          alignItems="center"
          {...slotProps?.cardContent}
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
      <CardActions
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          pointerEvents: "none",
        }}
      >
        <MenuOptionsIconButton
          options={options}
          sx={{ pointerEvents: "auto" }}
        />
      </CardActions>
    </Stack>
  );
};

export default ClientListCard;
