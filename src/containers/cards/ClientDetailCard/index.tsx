import {
  Card,
  CardContent,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";

import type { Client } from "@/types/firebase";

interface ClientDetailCardProps extends CardProps {
  client: Client;
}

const ClientDetailCard = ({ client, ...props }: ClientDetailCardProps) => {
  /** Values */

  const fullName = `${client.first_name} ${client.last_name}`;
  const address = client.address.text;
  const phone = client.phone.toPhone();

  return (
    <Card {...props}>
      <CardContent component={Stack} spacing={1}>
        <Typography variant="body2">{fullName}</Typography>
        <Typography variant="body2">{address}</Typography>
        <Typography variant="body2">{client.email}</Typography>
        <Typography variant="body2">{phone}</Typography>
      </CardContent>
    </Card>
  );
};

export default ClientDetailCard;
