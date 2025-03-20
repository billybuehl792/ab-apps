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
import type { QueryDocumentSnapshot } from "firebase/firestore";

interface CustomerCard extends Omit<CardProps, "onClick"> {
  doc: QueryDocumentSnapshot<Customer>;
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    doc: QueryDocumentSnapshot<Customer>
  ) => void;
  options?: MenuOption[];
}

const CustomerCard: FC<CustomerCard> = ({
  doc,
  options,
  onClick,
  ...props
}) => {
  /** Values */

  const customer = doc.data();

  return (
    <Card variant="outlined" {...props}>
      <CardActionArea onClick={(event) => onClick?.(event, doc)}>
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

          {!!options && <MenuIconButton options={options} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerCard;
