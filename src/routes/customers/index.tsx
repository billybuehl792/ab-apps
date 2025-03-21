import { createFileRoute } from "@tanstack/react-router";
import { Box, Stack, Typography } from "@mui/material";
import CustomerPaginatedList from "@/containers/lists/CustomerPaginatedList";

export const Route = createFileRoute("/customers/")({
  component: Customers,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Customers() {
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        Customers <Box component="span">(-)</Box>
      </Typography>
      <CustomerPaginatedList />
    </Stack>
  );
}
