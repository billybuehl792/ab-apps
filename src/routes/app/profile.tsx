import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Container, Divider, Stack, Typography } from "@mui/material";

export const Route = createFileRoute("/app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack width="100%" height="100%">
      <Container maxWidth="md" disableGutters>
        <Stack spacing={2} p={2} pb={0}>
          <Typography variant="body2" fontWeight="bold">
            Profile
          </Typography>
          <Divider />
        </Stack>
      </Container>
      <Stack overflow="auto">
        <Container maxWidth="md" disableGutters>
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  );
}
