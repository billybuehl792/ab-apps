import { createFileRoute } from "@tanstack/react-router";
import ClientList from "@/containers/lists/ClientList";

export const Route = createFileRoute("/app/clients/")({
  component: ClientList,
});
