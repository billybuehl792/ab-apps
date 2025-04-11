import { type ComponentProps } from "react";
import { Box, type BoxProps, Drawer, type DrawerProps } from "@mui/material";

import NavigationList from "@/containers/lists/NavigationList";
import { APP_BAR_HEIGHT, DESKTOP_SIDE_PANEL_WIDTH } from "@/constants/layout";
import { sxAsArray } from "@/utils/sx";
import { EMPTY_OBJECT } from "@/constants/utility";

interface NavigationPanelProps extends DrawerProps {
  slotProps?: {
    nav?: BoxProps<"nav">;
    list?: ComponentProps<typeof NavigationList>;
  } & DrawerProps["slotProps"];
}

const NavigationPanel = ({
  slotProps: { nav: navProps, list: listProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: NavigationPanelProps) => {
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
