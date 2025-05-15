import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ErrorCard from "@/components/cards/ErrorCard";
import VerifyUserEmailButton from "@/containers/buttons/VerifyUserEmailButton";
import UserAvatarUploadIconButton from "@/containers/buttons/UserAvatarUploadIconButton";

export const Route = createFileRoute("/app/account")({
  component: RouteComponent,
  loader: ({ context }) => {
    const user = context.auth.user;
    if (!user) throw new Error("User not found");

    return { crumb: "Account", user };
  },
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { user } = Route.useLoaderData();

  const items = [
    { id: "displayName", label: "Display Name", value: user.displayName },
    {
      id: "email",
      label: "Email",
      value: (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" fontWeight={600}>
            {user.email}
          </Typography>
          <VerifyUserEmailButton user={user} />
        </Stack>
      ),
    },
    { id: "phone", label: "Phone", value: user.phoneNumber?.toPhone() },
    { id: "created", label: "Created", value: user.metadata.creationTime },
    {
      id: "lastLogin",
      label: "Last Sign In",
      value: user.metadata.lastSignInTime,
    },
  ];

  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6" noWrap>
          Account Info
        </Typography>

        <Card>
          <CardContent
            component={Stack}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            minHeight={160}
            bgcolor={({ palette }) => palette.primary.main}
          >
            <UserAvatarUploadIconButton user={user} />
            <Typography variant="h6" fontWeight={600} color="white">
              {user.displayName ?? user.email ?? "User"}
            </Typography>
          </CardContent>
          <CardContent
            component={Stack}
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Stack spacing={1}>
              {items.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Typography variant="body2">{item.label}:</Typography>
                  {typeof item.value === "string" ? (
                    <Typography variant="body2" fontWeight={600}>
                      {item.value}
                    </Typography>
                  ) : (
                    item.value
                  )}
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
