import {
  AppBar as MuiAppBar,
  Stack,
  Toolbar,
  useMediaQuery,
  type AppBarProps as MuiAppBarProps,
} from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import UserIconButton from "@/containers/buttons/UserIconButton";
import SignInLink from "@/containers/links/SignInLink";
import AppLogoLink from "@/containers/links/AppLogoLink";
import NavigationMenuIconButton from "@/containers/buttons/NavigationMenuIconButton";

const AppBar = (props: MuiAppBarProps) => {
  /** Values */

  const auth = useAuth();

  const isDesktop = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));

  return (
    <MuiAppBar elevation={0} {...props}>
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {!isDesktop && <NavigationMenuIconButton />}
            <AppLogoLink />
          </Stack>
          {auth.user ? <UserIconButton /> : <SignInLink color="white" />}
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
