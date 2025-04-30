import { type ComponentProps } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Stack } from "@mui/material";

import AuthWorkflow from "@/containers/workflows/AuthWorkflow";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.user) redirect({ to: "/", throw: true });
  },
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
});

function RouteComponent() {
  /** Values */

  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  /** Callbacks */

  const handleSignInSuccess: ComponentProps<
    typeof AuthWorkflow
  >["onSuccess"] = () => void navigate({ to: redirect || "/", replace: true });

  return (
    <Stack p={2}>
      <AuthWorkflow onSuccess={handleSignInSuccess} />
    </Stack>
  );
}
