import { type FC } from "react";
import { Box, Drawer, type DrawerProps } from "@mui/material";
import {
  DESKTOP_APP_BAR_HEIGHT,
  DESKTOP_SIDE_PANEL_WIDTH,
} from "@/constants/layout";
import NavigationList from "@/containers/lists/NavigationList";

const DesktopSidePanel: FC<DrawerProps> = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        width: DESKTOP_SIDE_PANEL_WIDTH,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DESKTOP_SIDE_PANEL_WIDTH,
        },
      }}
    >
      <Box
        component="nav"
        style={{ marginTop: DESKTOP_APP_BAR_HEIGHT, overflow: "auto" }}
      >
        <NavigationList />
      </Box>
    </Drawer>
  );
};

export default DesktopSidePanel;
