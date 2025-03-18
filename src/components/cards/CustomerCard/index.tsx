import { type FC } from "react";
import {
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import type { Customer } from "@/types/global";

interface CustomerCard
  extends Omit<CardProps, "onClick">,
    Pick<CardActionAreaProps, "onClick"> {
  customer: Customer;
}

const CustomerCard: FC<CustomerCard> = ({ customer, onClick, ...props }) => {
  return (
    <Card {...props}>
      <CardActionArea onClick={onClick}>
        <CardContent component={Stack} spacing={1}>
          <Typography variant="h5">{customer.name}</Typography>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            alignItems="center"
          >
            <Typography variant="subtitle2">Phone: {customer.phone}</Typography>
            <Typography variant="subtitle2">Email: {customer.email}</Typography>
            <Typography variant="subtitle2">
              Address: {customer.address}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerCard;
