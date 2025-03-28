import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack } from "@mui/material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import ClientForm from "@/containers/forms/ClientForm";
import type { Client } from "@/firebase/types";

export const Route = createFileRoute("/clients/$id")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
  },
  loader: async ({ context, params }) => {
    const clientSnapshot = await context.queryClient.fetchQuery(
      firestoreQueries.getClient(params.id)
    );
    const client: Client = { id: clientSnapshot.id, ...clientSnapshot.data() };

    return { client };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const { client } = Route.useLoaderData();
  const { update } = firestoreMutations.useClientMutations();
  const navigate = useNavigate();

  return (
    <ClientForm
      values={client}
      onSubmit={async (formData) => {
        await update.mutateAsync(
          { id: client.id, ...formData },
          { onSuccess: () => navigate({ to: "/clients" }) }
        );
      }}
    />
  );
}
