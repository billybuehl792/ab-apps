import { type MouseEvent } from "react";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  Stack,
  Typography,
  type CardProps,
  type CardContentProps,
} from "@mui/material";

import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import { sxAsArray } from "@/utils/sx";
import { EMPTY_OBJECT } from "@/constants/utility";
import type { Client } from "@/types/firebase";

interface ClientCardProps extends Omit<CardProps, "onClick"> {
  client: Client;
  disabled?: boolean;
  options?: MenuOption[] | ((client: Client) => MenuOption[]);
  onClick?: (event: MouseEvent<HTMLButtonElement>, client: Client) => void;
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
}

const ClientCard = ({
  client,
  disabled,
  options: optionsProp,
  onClick,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = EMPTY_OBJECT,
  ...props
}: ClientCardProps) => {
  /** Values */

  const options =
    typeof optionsProp === "function" ? optionsProp(client) : optionsProp;

  return (
    <Card {...props}>
      <CardActionArea
        disabled={disabled}
        onClick={(event) => onClick?.(event, client)}
        disableTouchRipple={!onClick}
        {...cardActionAreaProps}
        sx={[
          { cursor: onClick ? "pointer" : "default" },
          ...sxAsArray(cardActionAreaProps?.sx),
        ]}
      >
        <CardContent
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          {...cardContentProps}
        >
          <Stack spacing={0.75} overflow="hidden">
            <Typography variant="body2" fontWeight="bold" noWrap>
              {`${client.first_name} ${client.last_name}`}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {client.address}
            </Typography>
          </Stack>
          {!!options && <MenuOptionsIconButton options={options} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClientCard;
