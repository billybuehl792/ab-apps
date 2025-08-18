import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Box, Container, Stack } from "@mui/material";
import PageHeader from "@/components/layout/PageHeader";

export const Route = createFileRoute("/app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack width="100%" height="100%">
      <Container maxWidth="md" disableGutters>
        <PageHeader title="Profile" />
      </Container>
      <Box overflow="auto">
        <Container maxWidth="md" disableGutters>
          <Box p={2}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Stack>
  );
}
