import { type SyntheticEvent, type ComponentProps, type FC } from "react";
import { Box, Stack, Typography, type BoxProps } from "@mui/material";
import NavigationList from "@/containers/lists/NavigationList";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import CloseIconButton from "@/components/buttons/CloseIconButton";
import { APP_TITLE } from "@/constants/layout";

interface NavigationDrawerProps extends ComponentProps<typeof SwipeableDrawer> {
  slotProps?: {
    nav?: BoxProps<"nav">;
    list?: ComponentProps<typeof NavigationList>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

const NavigationDrawer: FC<NavigationDrawerProps> = ({
  onClose,
  slotProps: { nav: navProps, list: listProps, ...slotProps } = {},
  ...props
}) => {
  return (
    <SwipeableDrawer slotProps={slotProps} onClose={onClose} {...props}>
      <Stack direction="row" justifyContent="space-between" px={2} py={1.5}>
        <Typography variant="h6">{APP_TITLE}</Typography>
        <CloseIconButton
          onClick={(event) => onClose?.(event as unknown as SyntheticEvent)}
        />
      </Stack>
      <Box component="nav" style={{ overflow: "auto" }} {...navProps}>
        <NavigationList {...listProps} />
      </Box>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
