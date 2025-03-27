import { useState, type FC, type MouseEvent } from "react";
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
import OptionDrawer from "@/components/modals/OptionDrawer";
import { LongPressEventType, useLongPress } from "use-long-press";
import type { MenuOption } from "@/types/global";
import type { Client } from "@/firebase/types";

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

const ClientCard: FC<ClientCardProps> = ({
  client,
  disabled,
  options: optionsProp,
  onClick,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = {},
  ...props
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  /** Values */

  const touchHandlers = useLongPress(() => setOptionsOpen(true), {
    detect: LongPressEventType.Touch,
    threshold: 500,
  });

  const options =
    typeof optionsProp === "function" ? optionsProp(client) : optionsProp;

  return (
    <Card variant="outlined" {...props}>
      <CardActionArea
        onClick={(event) => onClick?.(event, client)}
        disabled={disabled}
        disableTouchRipple={!onClick}
        {...touchHandlers()}
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
              {client.first_name} {client.last_name}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems="center"
            >
              <Typography variant="subtitle2">Phone: {client.phone}</Typography>
              <Typography variant="subtitle2">Email: {client.email}</Typography>
              <Typography variant="subtitle2">
                Address: {client.address}
              </Typography>
            </Stack>
          </Stack>

          {!!options && (
            <MenuIconButton
              options={options}
              sx={{
                "@media (hover:none)": {
                  display: "none",
                },
              }}
            />
          )}
        </CardContent>
      </CardActionArea>

      {/* Modals */}
      {!!options && (
        <OptionDrawer
          open={optionsOpen}
          options={options}
          onClose={() => setOptionsOpen(false)}
        />
      )}
    </Card>
  );
};

export default ClientCard;
