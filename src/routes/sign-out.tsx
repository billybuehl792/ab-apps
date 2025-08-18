import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import FullScreen from "@/components/layout/FullScreen";
import { authUtils } from "@/store/utils/auth";

export const Route = createFileRoute("/sign-out")({
  beforeLoad: async ({ context }) => {
    if (authUtils.authGuard(context.auth))
      await context.auth.signOut.mutateAsync();
    redirect({ to: "/sign-in", throw: true });
  },
  pendingComponent: () => (
    <FullScreen component="main">
      <Card sx={{ flexGrow: 1, maxWidth: 300, m: 2 }}>
        <CardContent
          component={Stack}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={40} />
          <Typography textAlign="center">
            You are being signed out...
          </Typography>
        </CardContent>
      </Card>
    </FullScreen>
  ),
});
