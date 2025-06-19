import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { orderBy, where } from "firebase/firestore";
import { Stack } from "@mui/material";
import { Groups } from "@mui/icons-material";

import clientCollection from "@/lib/collections/firebase/clientCollection";
import PaginatedList from "@/components/lists/PaginatedList";
import CreateClientLink from "@/containers/links/CreateClientLink";
import ClientSearchField from "@/containers/fields/ClientSearchField";
import ClientCard from "@/containers/cards/ClientCard";
import SortAndFilterIconButton from "@/components/buttons/SortAndFilterIconButton";
import { type SortAndFilterFormValues } from "@/components/forms/SortAndFilterForm";

export const Route = createFileRoute("/app/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sort, setSort] = useState<MenuOption | null>(null);
  const [filters, setFilters] = useState<MenuOption[]>([]);

  /** Values */

  const sortOptions: MenuOption<"first_name" | "last_name">[] = [
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
  ];

  /** Callbacks */

  const handleSortAndFilterSubmit = (data: SortAndFilterFormValues) => {
    setSort(data.sort);
    setFilters(data.filters);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <ClientSearchField />
        <SortAndFilterIconButton
          values={{ sort, filters }}
          sortOptions={sortOptions}
          onSubmit={handleSortAndFilterSubmit}
        />
      </Stack>
      <PaginatedList
        collection={clientCollection}
        constraints={[
          where("archived", "!=", true),
          orderBy(sort?.id ?? "first_name"),
        ]}
        renderItem={(client) => <ClientCard key={client.id} client={client} />}
        emptyState={{
          text: "No Clients",
          icon: <Groups fontSize="large" color="disabled" />,
          children: <CreateClientLink />,
        }}
      />
    </Stack>
  );
}
