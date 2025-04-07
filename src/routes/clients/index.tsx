import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";
import AddIconButton from "@/components/buttons/AddIconButton";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.5} alignItems="center" width="100%">
        <Typography variant="h6">Clients</Typography>
        <AddIconButton onClick={() => navigate({ to: "/clients/create" })} />
      </Stack>
      <ClientPaginatedList />
    </Stack>
  );
}
