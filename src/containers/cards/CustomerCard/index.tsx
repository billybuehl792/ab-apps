import { type FC, type MouseEvent } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import MenuIconButton from "@/components/buttons/MenuIconButton";
import type { Customer, MenuOption } from "@/types/global";

interface CustomerCard extends Omit<CardProps, "onClick"> {
  customer: Customer;
  onClick?: (event: MouseEvent<HTMLButtonElement>, customer: Customer) => void;
  options?: MenuOption[];
}

/**
 * This component renders a card with customer information.
 * @param customer - The customer document snapshot.
 * @param options - The options to display in the card menu.
 * @param onClick - The function to call when the card is clicked.
 */
const CustomerCard: FC<CustomerCard> = ({
  customer,
  options,
  onClick,
  ...props
}) => {
  /** Values */

  const { name, phone, email, address } = customer.data();

  return (
    <Card variant="outlined" {...props}>
      <CardActionArea onClick={(event) => onClick?.(event, customer)}>
        <CardContent
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold">
              {name}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems="center"
            >
              <Typography variant="subtitle2">Phone: {phone}</Typography>
              <Typography variant="subtitle2">Email: {email}</Typography>
              <Typography variant="subtitle2">Address: {address}</Typography>
            </Stack>
          </Stack>

          {!!options && <MenuIconButton options={options} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerCard;
