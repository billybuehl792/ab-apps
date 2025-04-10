import { type ComponentProps, type FC } from "react";
import { Box, type BoxProps, Drawer, type DrawerProps } from "@mui/material";

import NavigationList from "@/containers/lists/NavigationList";
import { APP_BAR_HEIGHT, DESKTOP_SIDE_PANEL_WIDTH } from "@/constants/layout";
import { sxAsArray } from "@/lib/utils/sx";

interface NavigationPanelProps extends DrawerProps {
  slotProps?: {
    nav?: BoxProps<"nav">;
    list?: ComponentProps<typeof NavigationList>;
  } & DrawerProps["slotProps"];
}

const NavigationPanel: FC<NavigationPanelProps> = ({
  slotProps: { nav: navProps, list: listProps, ...slotProps } = {},
  ...props
}) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      slotProps={slotProps}
      {...props}
      sx={[
        {
          flexShrink: 0,
          width: DESKTOP_SIDE_PANEL_WIDTH,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DESKTOP_SIDE_PANEL_WIDTH,
          },
        },
        ...sxAsArray(props?.sx),
      ]}
    >
      <Box
        component="nav"
        style={{ marginTop: APP_BAR_HEIGHT, overflow: "auto" }}
        {...navProps}
      >
        <NavigationList {...listProps} />
      </Box>
    </Drawer>
  );
};

export default NavigationPanel;
