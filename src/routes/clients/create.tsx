import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import ClientForm from "@/containers/forms/ClientForm";
import { firestoreMutations } from "@/firebase/mutations";

export const Route = createFileRoute("/clients/create")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();
  const { create } = firestoreMutations.useClientMutations();

  return (
    <Stack spacing={1} p={2}>
      <Typography variant="h6">Create Client</Typography>
      <ClientForm
        disableReset
        submitLabel="Create"
        onSubmit={async (formData) => {
          await create.mutateAsync(formData, {
            onSuccess: () => navigate({ to: "/clients" }),
          });
        }}
      />
    </Stack>
  );
}
