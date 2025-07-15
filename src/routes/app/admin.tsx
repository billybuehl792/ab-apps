import { createFileRoute, redirect } from "@tanstack/react-router";
import { Container, Stack, Typography } from "@mui/material";
import { AuthRole } from "@/store/enums/auth";
import UserList from "@/containers/lists/UserList";

export const Route = createFileRoute("/app/admin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const isAdmin = [AuthRole.ADMIN, AuthRole.SUPER_ADMIN].includes(
      context.auth.permissions?.role ?? AuthRole.STANDARD
    );

    if (!isAdmin) redirect({ to: "/app", replace: true, throw: true });
  },
});

function RouteComponent() {
  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6" noWrap>
          Admin
        </Typography>
        <UserList />
      </Stack>
    </Container>
  );
}
