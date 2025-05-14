import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

import useAuth from "@/hooks/auth/useAuth";

export const Route = createFileRoute("/email-verify")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (!context.auth.user)
      redirect({ to: "/sign-in", replace: true, throw: true });
    else if (context.auth.user.emailVerified)
      redirect({ to: search.redirect ?? "/app", replace: true, throw: true });
    else context.auth.sendEmailVerification?.mutate(context.auth.user);
  },
});

function RouteComponent() {
  /** Values */

  const router = useRouter();
  const { user, signOut, sendEmailVerification } = useAuth();

  /** Queries */

  useQuery({
    queryKey: ["emailVerificationStatus"],
    queryFn: async () => {
      await user?.reload();
      if (user?.emailVerified) await router.invalidate();

      return true;
    },
    refetchOnWindowFocus: true,
    enabled: sendEmailVerification?.isSuccess,
  });

  /** Callbacks */

  const handleSignOut = () => {
    signOut?.mutate(undefined, { onSuccess: () => void router.invalidate() });
  };

  return (
    <Box
      component="main"
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      top={0}
      bottom={0}
      left={0}
      right={0}
      bgcolor={({ palette }) => palette.primary.main}
    >
      <Card sx={{ flexGrow: 1, maxWidth: 500 }}>
        <Stack component={CardContent} spacing={2}>
          <Typography variant="h5">Email Verification Required</Typography>
          <Typography variant="body2">
            Please verify your email address to access all features of the app.
            Alternatively, you can
            <Link
              component="span"
              underline="hover"
              onClick={handleSignOut}
              sx={{ mx: 1, fontWeight: 600, cursor: "pointer" }}
            >
              sign out
            </Link>
            and log in with a different account.
          </Typography>

          <Stack spacing={1} direction="row" alignItems="center">
            <Check fontSize="small" color="success" />
            <Typography variant="body2">
              Verification link sent to your email
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
