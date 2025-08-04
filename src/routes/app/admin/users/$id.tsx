import { createFileRoute } from "@tanstack/react-router";
import { userQueries } from "@/store/queries/users";
import ErrorCard from "@/components/cards/ErrorCard";
import StatusWrapper from "@/components/layout/StatusWrapper";
import UserRecordDetailCard from "@/containers/cards/UserRecordDetailCard";

export const Route = createFileRoute("/app/admin/users/$id")({
  loader: async ({ context, params }) => {
    const user = await context.queryClient.fetchQuery(
      userQueries.detail(params.id)
    );
    return { user, crumb: user.displayName ?? user.email ?? "User" };
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

  return <UserRecordDetailCard user={user} editable />;
}
