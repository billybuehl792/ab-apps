import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import NavigationList from "@/containers/lists/NavigationList";
import NavigationFooter from "@/containers/layout/NavigationFooter";
import AppBar from "@/containers/layout/AppBar";
import {
  APP_BAR_HEIGHT,
  APP_BOTTOM_SAFE_AREA_HEIGHT,
  APP_FOOTER_HEIGHT,
  APP_SIDE_PANEL_WIDTH,
} from "@/store/constants/layout";
import { authUtils } from "@/store/utils/auth";
import FullScreen from "@/components/layout/FullScreen";
import ErrorCard from "@/components/cards/ErrorCard";
import SignOutButton from "@/containers/buttons/SignOutButton";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!authUtils.authGuard(context.auth))
      redirect({
        to: "/sign-in",
        search: {
          redirect: location.pathname === "/app" ? undefined : location.href,
        },
        replace: true,
        throw: true,
      });
    if (!authUtils.userProfileIsValid(context.auth))
      throw new Error("Invalid user configuration", {
        cause:
          "There is an error with your user configuration. Contact an admin for support.",
      });
  },
  errorComponent: ({ error }) => (
    <FullScreen component="main">
      <ErrorCard
        error={error}
        description={
          <Stack spacing={1}>
            {typeof error.cause === "string" && (
              <Typography variant="body2" color="textSecondary">
                {error.cause}
              </Typography>
            )}
            <Stack direction="row" justifyContent="center">
              <SignOutButton disableConfirm />
            </Stack>
          </Stack>
        }
      />
    </FullScreen>
  ),
});

function RouteComponent() {
  /** Values */

  const isDesktop = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));
  const isMobile = useMediaQuery("(pointer: coarse)");

  return (
    <>
      <Box
        component="main"
        position="fixed"
        top={APP_BAR_HEIGHT}
        bottom={
          isDesktop
            ? 0
            : APP_FOOTER_HEIGHT + (isMobile ? APP_BOTTOM_SAFE_AREA_HEIGHT : 0)
        }
        left={isDesktop ? APP_SIDE_PANEL_WIDTH : 0}
        right={0}
        overflow="auto"
      >
        <Outlet />
      </Box>
      {isDesktop && (
        <Paper
          component="nav"
          variant="outlined"
          square
          sx={{
            position: "fixed",
            left: 0,
            top: APP_BAR_HEIGHT,
            bottom: 0,
            width: APP_SIDE_PANEL_WIDTH,
            overflowY: "auto",
            zIndex: ({ zIndex }) => zIndex.drawer,
          }}
        >
          <NavigationList />
        </Paper>
      )}
      <AppBar sx={{ height: APP_BAR_HEIGHT }} />
      {!isDesktop && (
        <NavigationFooter
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: APP_FOOTER_HEIGHT,
            pb: isMobile ? APP_BOTTOM_SAFE_AREA_HEIGHT / 8 : 0,
            zIndex: ({ zIndex }) => zIndex.appBar,
          }}
        />
      )}
    </>
  );
}
