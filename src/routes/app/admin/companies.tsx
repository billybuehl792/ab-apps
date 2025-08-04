import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import { authUtils } from "@/store/utils/auth";
import { AuthRole } from "@/store/enums/auth";

export const Route = createFileRoute("/app/admin/companies")({
  beforeLoad: ({ context }) => {
    if (
      !authUtils.authGuard(context.auth, {
        permissions: { role: AuthRole.SUPER_ADMIN },
      })
    )
      redirect({ to: "/app/admin", replace: true, throw: true });
  },
  loader: () => ({ crumb: "Companies" }),
  component: () => (
    <Stack p={2}>
      <Outlet />
    </Stack>
  ),
});
