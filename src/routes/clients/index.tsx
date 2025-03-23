import { createFileRoute } from "@tanstack/react-router";
import { Box, Stack, Typography } from "@mui/material";
import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";

export const Route = createFileRoute("/clients/")({
  component: Clients,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Clients() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        Clients <Box component="span">(-)</Box>
      </Typography>
      <ClientPaginatedList />
    </Stack>
  );
}
