import { createFileRoute } from "@tanstack/react-router";

import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";

export const Route = createFileRoute("/app/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientPaginatedList />;
}
