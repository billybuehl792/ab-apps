import { Link } from "@tanstack/react-router";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  type CardProps,
  CardActions,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import ClientMenuIconButton from "@/containers/buttons/ClientMenuIconButton";
import type { Client } from "@/store/types/clients";

interface ClientListCardProps extends CardProps {
  client: Client;
}

const ClientListCard = ({ client, ...props }: ClientListCardProps) => {
  return (
    <Stack
      component={Card}
      position="relative"
      {...props}
      sx={{ opacity: client.archived ? 0.5 : 1 }}
    >
      <CardActionArea LinkComponent={Link} href={`/app/clients/${client.id}`}>
        <CardContent
          component={Stack}
          direction="row"
          spacing={2}
          mr={7.5}
          alignItems="center"
        >
          <Person />
          <Stack spacing={0.75} overflow="hidden">
            <Typography variant="body2" fontWeight="bold" noWrap>
              {`${client.first_name} ${client.last_name}`}
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
        <ClientMenuIconButton client={client} sx={{ pointerEvents: "auto" }} />
      </CardActions>
    </Stack>
  );
};

export default ClientListCard;
