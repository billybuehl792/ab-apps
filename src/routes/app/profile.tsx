import { createFileRoute } from "@tanstack/react-router";
import { Container, Divider, Stack } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import UserRecordDetailCard from "@/containers/cards/UserRecordDetailCard";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";

export const Route = createFileRoute("/app/profile")({
  loader: () => ({ crumb: "Profile" }),
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const { user } = useAuth();

  return (
    <Stack width="100%" height="100%">
      <Container maxWidth="md" disableGutters>
        <Stack spacing={2} p={2} pb={0}>
          <NavigationBreadcrumbs />
          <Divider />
        </Stack>
      </Container>
      <Stack overflow="auto">
        <Container maxWidth="md" disableGutters>
          <Stack p={2}>
            <UserRecordDetailCard user={user?.uid ?? ""} />
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
}
