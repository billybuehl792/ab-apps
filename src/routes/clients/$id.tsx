import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack } from "@mui/material";
import { firestoreQueries } from "@/firebase/queries";
import { firestoreMutations } from "@/firebase/mutations";
import ClientForm from "@/containers/forms/ClientForm";

export const Route = createFileRoute("/clients/$id")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async ({ context, params }) => {
    const client = await context.queryClient.fetchQuery(
      firestoreQueries.getClient(params.id)
    );
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
      onSubmit={(formData) =>
        update.mutate(
          { id: client.id, ...formData },
          { onSuccess: () => navigate({ to: "/clients" }) }
        )
      }
    />
  );
}
