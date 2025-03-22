import { type ReactNode, type FC, type MouseEvent } from "react";
import { type QueryDocumentSnapshot } from "firebase/firestore";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
  type CardContentProps,
} from "@mui/material";
import MenuIconButton from "@/components/buttons/MenuIconButton";
import type { CustomerData, MenuOption } from "@/types/global";

interface CustomerCard extends Omit<CardProps, "onClick"> {
  customer: QueryDocumentSnapshot<CustomerData>;
  disabled?: boolean;
  options?: MenuOption[];
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    customer: QueryDocumentSnapshot<CustomerData>
  ) => void;
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
}

const CustomerCard: FC<CustomerCard> = ({
  customer,
  disabled,
  options,
  onClick,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = {},
  ...props
}: CustomerCard): ReactNode => {
  /** Values */

  const { name, phone, email, address } = customer.data();

  return (
    <Card variant="outlined" {...props}>
      <CardActionArea
        onClick={(event) => onClick?.(event, customer)}
        disabled={disabled}
        {...cardActionAreaProps}
      >
        <CardContent
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          {...cardContentProps}
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
