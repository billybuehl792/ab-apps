import { createFileRoute } from "@tanstack/react-router";
import ErrorCard from "@/components/cards/ErrorCard";
import UserDetailCard from "@/containers/cards/UserDetailCard";

export const Route = createFileRoute("/app/profile/")({
  loader: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");

    return {
      user: context.auth.user,
      profile: context.auth.profile,
      crumb: context.auth.user.displayName ?? "Me",
    };
  },
  errorComponent: ({ error }) => <ErrorCard error={error} sx={{ m: 2 }} />,
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const { user, profile } = Route.useLoaderData();

  return <UserDetailCard user={user} profile={profile} />;
}
