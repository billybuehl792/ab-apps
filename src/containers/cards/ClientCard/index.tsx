import { useNavigate } from "@tanstack/react-router";
import { type MouseEvent } from "react";
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
import { Delete, Edit, Restore } from "@mui/icons-material";

import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import { EMPTY_OBJECT } from "@/constants/utility";
import type { Client } from "@/types/firebase";
import useClients from "@/hooks/firebase/useClients";

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
  /** Values */

  const navigate = useNavigate();
  const { archive } = useClients();

  const fullName = `${client.first_name} ${client.last_name}`;
  const disabled = disabledProp || archive.isPending;

  /** Callbacks */

  const onClick: CardActionAreaProps["onClick"] = (event) => {
    if (onClickProp) onClickProp(event, client);
    else void navigate({ to: `/app/clients/${client.id}` });
  };

  /** Options */

  const options: MenuOption[] = optionsProp ?? [
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
      confirm:
        "Are you sure you want to delete this client? This action cannot be undone.",
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
        archive.mutate(client.id);
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
          justifyContent="space-between"
          alignItems="center"
          {...cardContentProps}
        >
          <Stack spacing={0.75} overflow="hidden">
            <Typography variant="body2" fontWeight="bold" noWrap>
              {fullName}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {client.address.text}
            </Typography>
          </Stack>
          {Boolean(options.length) && (
            <MenuOptionsIconButton title={fullName} options={options} />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClientCard;
