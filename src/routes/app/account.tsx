import { createFileRoute } from "@tanstack/react-router";
import { Container, Stack, Typography } from "@mui/material";

import ErrorCard from "@/components/cards/ErrorCard";
import UserDetailCard from "@/containers/cards/UserDetailCard";

export const Route = createFileRoute("/app/account")({
  component: RouteComponent,
  loader: ({ context }) => {
    const user = context.auth.user;
    if (!user) throw new Error("User not found");

    return { crumb: "Account", user };
  },
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { user } = Route.useLoaderData();

  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6" noWrap>
          Account Info
        </Typography>
        <UserDetailCard user={user} />
      </Stack>
    </Container>
  );
}
