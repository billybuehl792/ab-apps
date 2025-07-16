import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ErrorCard from "@/components/cards/ErrorCard";
import UserPermissionsChip from "@/containers/chips/UserPermissionsChip";
import UserEmailChip from "@/containers/chips/UserEmailChip";

export const Route = createFileRoute("/app/admin/users/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const user = await context.queryClient.fetchQuery(
      context.users.queries.detail(params.id)
    );
    return { user, crumb: user.displayName ?? user.email ?? "User" };
  },
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { user } = Route.useLoaderData();

  const details = [
    { id: "email", label: "Email", value: <UserEmailChip user={user} /> },
    {
      id: "id",
      label: "ID",
      value: <Typography variant="body2">{user.uid}</Typography>,
    },
    {
      id: "permissions",
      label: "Permissions",
      value: <UserPermissionsChip user={user.uid} />,
    },
  ];

  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack spacing={1} alignItems="center">
        <Avatar
          src={user.photoURL}
          alt={user.displayName ?? user.email ?? "User"}
          sx={{ width: 180, height: 180 }}
        />
        <Typography variant="h6">
          {user.displayName ?? user.email ?? "User"}
        </Typography>
      </Stack>
      <Card component={Stack} flexGrow={1} spacing={2}>
        <CardContent
          component={Stack}
          spacing={2}
          flexGrow={1}
          divider={<Divider />}
        >
          <Stack spacing={1}>
            {details.map((detail) => (
              <Stack
                key={detail.id}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Typography variant="body2" color="textSecondary">
                  {detail.label}:
                </Typography>
                {detail.value}
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
