import { createFileRoute } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import CustomerInfiniteList from "@/containers/lists/CustomerInfiniteList";

export const Route = createFileRoute("/about/")({
  component: About,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function About() {
  return (
    <Stack spacing={2}>
      <Typography variant="body2">Welcome to About Page</Typography>
      <CustomerInfiniteList />
    </Stack>
  );
}
