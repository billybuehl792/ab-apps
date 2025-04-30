import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  type MenuItemProps,
  Stack,
  Typography,
} from "@mui/material";
import { Place } from "@mui/icons-material";

import type { Address } from "@/types/firebase";

interface AddressMenuItemProps extends Omit<MenuItemProps, "value"> {
  value: Address;
}

const AddressMenuItem = ({ value, ...props }: AddressMenuItemProps) => {
  return (
    <MenuItem {...props}>
      <ListItemIcon>
        <Place />
      </ListItemIcon>
      <Stack component={ListItemText}>
        <Typography variant="body1">{value.primary_text}</Typography>
        <Typography variant="subtitle2">{value.secondary_text}</Typography>
      </Stack>
    </MenuItem>
  );
};

export default AddressMenuItem;
