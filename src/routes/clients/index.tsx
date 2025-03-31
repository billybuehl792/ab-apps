import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import ClientPaginatedList from "@/containers/lists/ClientPaginatedList";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";

export const Route = createFileRoute("/clients/")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
  },
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function RouteComponent() {
  /** Values */

  const navigate = useNavigate();

  return (
    <Stack spacing={1} p={2}>
      <Stack direction="row" spacing={0.5} alignItems="center" width="100%">
        <Typography variant="h6">Clients</Typography>
        <MenuOptionsIconButton
          options={[
            {
              id: "create",
              label: "Add Client",
              icon: <Add />,
              onClick: () => navigate({ to: "/clients/create" }),
            },
          ]}
        />
      </Stack>
      <ClientPaginatedList />
    </Stack>
  );
}
