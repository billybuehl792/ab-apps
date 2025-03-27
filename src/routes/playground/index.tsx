import PaginatedList from "@/components/lists/PaginatedList";
import ClientCard from "@/containers/cards/ClientCard";
import { clientCollection } from "@/firebase/collections";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PaginatedList
      collection={clientCollection}
      renderItem={(item) => <ClientCard key={item.id} client={item} />}
    />
  );
}
