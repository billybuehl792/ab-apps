import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { userQueries } from "@/store/queries/users";
import ErrorCard from "@/components/cards/ErrorCard";
import UserPermissionsChip from "@/containers/chips/UserPermissionsChip";
import UserEmailChip from "@/containers/chips/UserEmailChip";
import UserCompanyChip from "@/containers/chips/UserCompanyChip";
import UserPermissionsFormDrawer from "@/containers/modals/UserPermissionsFormDrawer";
import StatusWrapper from "@/components/layout/StatusWrapper";

export const Route = createFileRoute("/app/admin/users/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const user = await context.queryClient.fetchQuery(
      userQueries.detail(params.id)
    );
    return { user, crumb: user.displayName ?? user.email ?? "User" };
  },
  pendingComponent: () => (
    <StatusWrapper loading loadingDescription="loading user..." />
  ),
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  const [permissionsFormDrawerOpen, setPermissionsFormDrawerOpen] =
    useState(false);

  /** Values */

  const { user } = Route.useLoaderData();

  /** Callbacks */

  const handleTogglePermissionsFormDrawer = () => {
    setPermissionsFormDrawerOpen((prev) => !prev);
  };

  /** Items */
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
      value: (
        <UserPermissionsChip
          user={user}
          onClick={handleTogglePermissionsFormDrawer}
        />
      ),
    },
    {
      id: "company",
      label: "Company",
      value: <UserCompanyChip user={user} />,
    },
  ];

  const metadata = [
    {
      id: "creationTime",
      label: "Created At",
      value: user.metadata.creationTime,
    },
    {
      id: "lastSignInTime",
      label: "Last Sign In",
      value: user.metadata.lastSignInTime,
    },
  ];

  return (
    <Stack direction="row" spacing={2}>
      <Stack spacing={1} alignItems="center">
        <Avatar
          src={user.photoURL}
          alt={user.displayName ?? user.email ?? "User"}
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="body1">
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
          <Grid container spacing={1}>
            {metadata.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="textSecondary">
                    {item.label}:
                  </Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Modals */}
      <UserPermissionsFormDrawer
        user={user}
        open={permissionsFormDrawerOpen}
        onClose={handleTogglePermissionsFormDrawer}
      />
    </Stack>
  );
}
