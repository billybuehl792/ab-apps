import { type FC } from "react";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import MenuButton from "@/components/buttons/MenuButton";
import type { Customer, MenuOption } from "@/types/global";

interface CustomerCard
  extends Omit<CardProps, "onClick">,
    Pick<CardActionAreaProps, "onClick"> {
  customer: Customer;
  options?: MenuOption[];
}

const CustomerCard: FC<CustomerCard> = ({
  customer,
  options,
  onClick,
  ...props
}) => {
  return (
    <Card variant="outlined" {...props}>
      <CardActionArea onClick={onClick}>
        <CardContent
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold">
              {customer.name}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems="center"
            >
              <Typography variant="subtitle2">
                Phone: {customer.phone}
              </Typography>
              <Typography variant="subtitle2">
                Email: {customer.email}
              </Typography>
              <Typography variant="subtitle2">
                Address: {customer.address}
              </Typography>
            </Stack>
          </Stack>

          {!!options && <MenuButton options={options} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerCard;
