import { createFileRoute } from "@tanstack/react-router";
import { userQueries } from "@/store/queries/users";
import UserRecordDetailCard from "@/containers/cards/UserRecordDetailCard";
import StatusWrapper from "@/components/layout/StatusWrapper";
import ErrorCard from "@/components/cards/ErrorCard";

export const Route = createFileRoute("/app/profile/")({
  loader: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      userQueries.detail(context.auth.user?.uid ?? "")
    );
    return { user, crumb: user.displayName ?? "Me" };
  },
  pendingComponent: () => (
    <StatusWrapper loading loadingDescription="loading user..." />
  ),
  errorComponent: ({ error }) => <ErrorCard error={error} sx={{ m: 2 }} />,
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const { user } = Route.useLoaderData();

  return <UserRecordDetailCard user={user} />;
}
