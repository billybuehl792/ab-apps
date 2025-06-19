import type { Client } from "@/types/firebase";
import { MenuItem, Stack, Typography, type MenuItemProps } from "@mui/material";
import { Person } from "@mui/icons-material";

interface ClientMenuItemProps extends MenuItemProps {
  client: Client;
}

const ClientMenuItem = ({ client, ...props }: ClientMenuItemProps) => {
  return (
    <MenuItem {...props}>
      <Stack component="span" direction="row" spacing={1} alignItems="center">
        <Person />
        <Stack component="span">
          {`${client.first_name} ${client.last_name}`}
          <Typography variant="caption" color="textSecondary">
            {client.address.text}
          </Typography>
        </Stack>
      </Stack>
    </MenuItem>
  );
};

export default ClientMenuItem;
