import { createFileRoute } from "@tanstack/react-router";
import CustomerPaginatedList from "@/containers/lists/CustomerPaginatedList";
import { Stack } from "@mui/material";

export const Route = createFileRoute("/another/")({
  component: Another,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Another() {
  return <CustomerPaginatedList />;
}
