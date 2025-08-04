import { createFileRoute, redirect } from "@tanstack/react-router";
import { Card, CardContent } from "@mui/material";
import AuthWorkflow from "@/containers/features/AuthWorkflow";
import FullScreen from "@/components/layout/FullScreen";
import { authUtils } from "@/store/utils/auth";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (authUtils.authGuard(context.auth))
      redirect({ to: search.redirect ?? "/app", replace: true, throw: true });
  },
});

function RouteComponent() {
  /** Values */

  return (
    <FullScreen component="main">
      <Card sx={{ flexGrow: 1, maxWidth: 600, m: 2 }}>
        <CardContent>
          <AuthWorkflow />
        </CardContent>
      </Card>
    </FullScreen>
  );
}
