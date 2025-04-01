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
  useMediaQuery,
} from "@mui/material";
import { useLongPress } from "use-long-press";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import MenuOptionsDrawer from "@/components/modals/MenuOptionsDrawer";
import { LONG_PRESS_OPTIONS } from "@/constants/events";
import { sxUtils } from "@/utils/sx";
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

  const fullName = `${client.first_name} ${client.last_name}`;

  const options =
    typeof optionsProp === "function" ? optionsProp(client) : optionsProp;

  const isMobile = useMediaQuery("(hover: none)");
  const touchHandlers = useLongPress(
    () => setOptionsOpen(true),
    LONG_PRESS_OPTIONS
  );

  return (
    <Card {...props}>
      <CardActionArea
        disabled={disabled}
        onClick={(event) => onClick?.(event, client)}
        {...touchHandlers()}
        {...cardActionAreaProps}
        sx={[
          { cursor: onClick ? "pointer" : "default" },
          ...sxUtils.asArray(cardActionAreaProps?.sx),
        ]}
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
              {fullName.toTitleCase()}
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

          {!!options &&
            (isMobile ? (
              <MenuOptionsDrawer
                open={optionsOpen}
                title={fullName.toTitleCase()}
                options={options}
                onClose={() => setOptionsOpen(false)}
              />
            ) : (
              <MenuOptionsIconButton options={options} />
            ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClientCard;
