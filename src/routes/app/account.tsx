import { createFileRoute } from "@tanstack/react-router";
import { Container, Stack, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import UserDetailCard from "@/containers/cards/UserDetailCard";
import ErrorCard from "@/components/cards/ErrorCard";

export const Route = createFileRoute("/app/account")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const { user } = useAuth();

  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6" noWrap>
          Account Info
        </Typography>
        {user ? (
          <UserDetailCard user={user} />
        ) : (
          <ErrorCard error="User not found" />
        )}
      </Stack>
    </Container>
  );
}
