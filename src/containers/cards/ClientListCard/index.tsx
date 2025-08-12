import { Link } from "@tanstack/react-router";
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
import { Person } from "@mui/icons-material";
import ClientMenuIconButton from "@/containers/buttons/ClientMenuIconButton";
import type { Client } from "@/store/types/clients";

interface ClientListCardProps extends Omit<CardProps, "onClick"> {
  client: Client;
  disabled?: boolean;
  options?: MenuOption[];
  onClick?: CardActionAreaProps["onClick"];
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
}

const ClientListCard = ({
  client,
  disabled,
  onClick,
  options,
  slotProps,
  ...props
}: ClientListCardProps) => {
  /** Values */

  const fullName = `${client.first_name} ${client.last_name}`;

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
        {...(onClick
          ? { onClick }
          : { LinkComponent: Link, href: `/app/clients/${client.id}` })}
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
        <ClientMenuIconButton
          client={client}
          options={options}
          sx={{ pointerEvents: "auto" }}
        />
      </CardActions>
    </Stack>
  );
};

export default ClientListCard;
