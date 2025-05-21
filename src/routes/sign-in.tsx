import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Box, Card, CardContent } from "@mui/material";

import AuthWorkflow from "@/containers/features/AuthWorkflow";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.user)
      redirect({ to: search.redirect ?? "/app", replace: true, throw: true });
  },
});

function RouteComponent() {
  /** Values */

  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  /** Callbacks */

  const handleSignInSuccess = () => {
    void navigate({ to: redirect || "/", replace: true });
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
      <Card sx={{ flexGrow: 1, maxWidth: 600, m: 2 }}>
        <CardContent>
          <AuthWorkflow onSuccess={handleSignInSuccess} />
        </CardContent>
      </Card>
    </Box>
  );
}
