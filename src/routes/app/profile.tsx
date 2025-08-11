import { createFileRoute } from "@tanstack/react-router";
import { Container, Divider, Stack } from "@mui/material";
import { userQueries } from "@/store/queries/users";
import UserRecordDetailCard from "@/containers/cards/UserRecordDetailCard";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import StatusWrapper from "@/components/layout/StatusWrapper";
import ErrorCard from "@/components/cards/ErrorCard";

export const Route = createFileRoute("/app/profile")({
  loader: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      userQueries.detail(context.auth.user?.uid ?? "")
    );
    return { user, crumb: "Profile" };
  },
  pendingComponent: () => (
    <StatusWrapper loading loadingDescription="loading user..." />
  ),
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { user } = Route.useLoaderData();

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
            <UserRecordDetailCard user={user} />
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
}
