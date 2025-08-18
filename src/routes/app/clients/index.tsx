import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import ClientList from "@/containers/lists/ClientList";
import ClientSearchField from "@/containers/fields/ClientSearchField";
import SortAndFilterIconButton from "@/components/buttons/SortAndFilterIconButton";
import { type SortAndFilterFormValues } from "@/components/forms/SortAndFilterForm";

export const Route = createFileRoute("/app/clients/")({
  component: RouteComponent,
});

const SORT_OPTIONS: MenuOption[] = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
];

function RouteComponent() {
  const [selectedSort, setSelectedSort] = useState<MenuOption | null>(null);

  /** Callbacks */

  const handleSortAndFilterSubmit = (data: SortAndFilterFormValues) => {
    setSelectedSort(data.sort);
  };

  return (
    <Stack spacing={2} p={2} pt={0}>
      <Stack
        position="sticky"
        top={0}
        direction="row"
        spacing={1}
        alignItems="center"
        pt={2}
        zIndex={1}
        bgcolor={(theme) => theme.palette.background.paper}
      >
        <ClientSearchField />
        <SortAndFilterIconButton
          values={{ sort: selectedSort, filters: [] }}
          sortOptions={SORT_OPTIONS}
          onSubmit={handleSortAndFilterSubmit}
        />
      </Stack>
      <ClientList params={{ orderBy: selectedSort?.id }} />
    </Stack>
  );
}
