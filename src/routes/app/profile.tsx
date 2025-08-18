import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Box, Container } from "@mui/material";
import PageHeader from "@/components/layout/PageHeader";

export const Route = createFileRoute("/app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader title="Profile" />
      <Container maxWidth="md" disableGutters>
        <Box p={2}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
