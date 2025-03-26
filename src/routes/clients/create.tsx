import { type ComponentProps } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ClientForm from "@/containers/forms/ClientForm";
import { Stack } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { clientCollection } from "@/firebase/collections";

export const Route = createFileRoute("/clients/create")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();

  /** Callbacks */

  const onSubmit: ComponentProps<typeof ClientForm>["onSubmit"] = async (
    formData
  ) => {
    try {
      await addDoc(clientCollection, formData);
      navigate({ to: "/clients" });
    } catch (error) {
      alert("Error creating client");
    }
  };

  return <ClientForm onSubmit={onSubmit} />;
}
