import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  type AppBarProps,
} from "@mui/material";
import UserIconButton from "@/containers/buttons/UserIconButton";
import { DESKTOP_APP_BAR_HEIGHT } from "@/constants/layout";

const DesktopAppBar: FC<AppBarProps> = (props) => {
  return (
    <AppBar
      position="fixed"
      {...props}
      sx={{
        height: DESKTOP_APP_BAR_HEIGHT,
        zIndex: ({ zIndex }) => zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography
            component={Link}
            to="/"
            variant="h6"
            noWrap
            style={{
              color: "inherit",
              fontFamily: "monospace",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            AB Apps
          </Typography>

          <UserIconButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopAppBar;
