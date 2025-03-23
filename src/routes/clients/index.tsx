import { createFileRoute } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1">Clients</Typography>
      <ClientPaginatedList />
    </Stack>
  );
}
