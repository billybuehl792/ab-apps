import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import SignInForm from "@/containers/forms/SignInForm";

export const Route = createFileRoute("/sign-in/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth.user) throw redirect({ to: "/" });
  },
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
});

function RouteComponent() {
  /** Values */

  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return (
    <Stack spacing={0.5} maxWidth={500}>
      <Typography variant="h6">Sign In</Typography>
      <SignInForm
        onSubmit={async (formData) => {
          await signIn?.mutateAsync(formData, {
            onSuccess: () => navigate({ to: redirect || "/", replace: true }),
          });
        }}
      />
    </Stack>
  );
}
