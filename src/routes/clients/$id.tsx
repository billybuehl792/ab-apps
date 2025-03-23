import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircularProgress, Stack } from "@mui/material";
import ClientForm from "@/containers/forms/ClientForm";
import { clientCollection } from "@/firebase/collections";
import { doc, getDoc } from "firebase/firestore";

export const Route = createFileRoute("/clients/$id")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async ({ params }) => {
    const client = await getDoc(doc(clientCollection, params.id));
    if (!client.exists()) throw new Error("Client does not exist");
    return { client };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();
  const { client } = Route.useLoaderData();

  return (
    <ClientForm
      client={client}
      onSuccess={() => navigate({ to: "/clients" })}
    />
  );
}
