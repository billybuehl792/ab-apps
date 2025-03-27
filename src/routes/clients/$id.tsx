import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { doc, updateDoc } from "firebase/firestore";
import { CircularProgress, Stack } from "@mui/material";
import { clientCollection } from "@/firebase/collections";
import { firestoreQueries } from "@/firebase/queries";
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

  const navigate = useNavigate();
  const { client } = Route.useLoaderData();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = async (
    formData
  ) => {
    try {
      const docRef = doc(clientCollection, client.id);
      await updateDoc(docRef, { ...formData });
      navigate({ to: "/clients" });
    } catch (error) {
      alert("Error updating client");
    }
  };

  return <ClientForm values={client} onSubmit={onSubmit} />;
}
