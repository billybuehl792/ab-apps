import ErrorCard from "@/components/cards/ErrorCard";
import FullScreen from "@/components/layout/FullScreen";
import SignOutButton from "@/containers/buttons/SignOutButton";
import { authUtils } from "@/store/utils/auth";
import { Stack, Typography } from "@mui/material";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/misconfigured")({
  beforeLoad: ({ context }) => {
    if (!authUtils.authGuard(context.auth))
      redirect({ to: "/sign-in", replace: true, throw: true });
    if (authUtils.userProfileIsValid(context.auth))
      redirect({ to: "/app", replace: true, throw: true });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FullScreen component="main">
      <ErrorCard
        error="User Configuration Error"
        description={
          <Stack spacing={1}>
            <Typography variant="body2" color="textSecondary">
              There is an error with your user configuration. Contact an admin
              for support.
            </Typography>
            <Stack direction="row" justifyContent="center">
              <SignOutButton />
            </Stack>
          </Stack>
        }
      />
    </FullScreen>
  );
}
