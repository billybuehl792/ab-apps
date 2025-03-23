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
import type { ClientData, MenuOption } from "@/types/global";

interface ClientCard extends Omit<CardProps, "onClick"> {
  client: QueryDocumentSnapshot<ClientData>;
  disabled?: boolean;
  options?: MenuOption[];
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    client: QueryDocumentSnapshot<ClientData>
  ) => void;
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
}

const ClientCard: FC<ClientCard> = ({
  client,
  disabled,
  options,
  onClick,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = {},
  ...props
}: ClientCard): ReactNode => {
  /** Values */

  const { first_name, last_name, phone, email, address } = client.data();

  return (
    <Card variant="outlined" {...props}>
      <CardActionArea
        onClick={(event) => onClick?.(event, client)}
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
              {first_name} {last_name}
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

export default ClientCard;
