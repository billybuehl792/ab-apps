import { createFileRoute } from "@tanstack/react-router";
import { Container, Stack, Typography } from "@mui/material";
import useAuth from "@/hooks/auth/useAuth";
import UserDetailCard from "@/containers/cards/UserDetailCard";
import ErrorCard from "@/components/cards/ErrorCard";

export const Route = createFileRoute("/app/account")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const { user, company, permissions } = useAuth();

  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6" noWrap>
          Account Info
        </Typography>
        {user ? (
          <UserDetailCard
            user={user}
            company={company}
            permissions={permissions}
          />
        ) : (
          <ErrorCard message="User not found" />
        )}
      </Stack>
    </Container>
  );
}
