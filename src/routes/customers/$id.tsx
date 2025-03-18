import { createFileRoute } from "@tanstack/react-router";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { getCustomer } from "@/firebase/db";

export const Route = createFileRoute("/customers/$id")({
  component: Post,
  loader: async ({ params }) => {
    const customer = await getCustomer(params.id);
    return { customer };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: () => <Stack>Error loading customer</Stack>,
});

function Post() {
  const { customer } = Route.useLoaderData();

  return (
    <Stack spacing={1}>
      <Typography variant="h4">{customer.name}</Typography>
      <Typography variant="body1">{customer.email}</Typography>
      <Typography variant="body1">{customer.phone}</Typography>
      <Typography variant="body1">{customer.address}</Typography>
    </Stack>
  );
}
