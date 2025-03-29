import { type ComponentProps, type FC } from "react";
import { Box, type BoxProps, Drawer, type DrawerProps } from "@mui/material";
import NavigationList from "@/containers/lists/NavigationList";
import { sxUtils } from "@/utils/sx";
import {
  DESKTOP_APP_BAR_HEIGHT,
  DESKTOP_SIDE_PANEL_WIDTH,
} from "@/constants/layout";

interface DesktopSidePanelProps extends DrawerProps {
  slotProps?: {
    nav?: BoxProps<"nav">;
    list?: ComponentProps<typeof NavigationList>;
  } & DrawerProps["slotProps"];
}

const DesktopSidePanel: FC<DesktopSidePanelProps> = ({
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
        ...sxUtils.asArray(props?.sx),
      ]}
    >
      <Box
        component="nav"
        style={{ marginTop: DESKTOP_APP_BAR_HEIGHT, overflow: "auto" }}
        {...navProps}
      >
        <NavigationList {...listProps} />
      </Box>
    </Drawer>
  );
};

export default DesktopSidePanel;
