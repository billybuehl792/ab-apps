import { createFileRoute, Outlet } from "@tanstack/react-router";
import ErrorCard from "@/components/cards/ErrorCard";
import { authUtils } from "@/store/utils/auth";
import { AuthRole } from "@/store/enums/auth";

export const Route = createFileRoute("/app/admin/companies")({
  beforeLoad: ({ context }) => {
    const isSuperAdmin = authUtils.authGuard(context.auth, {
      permissions: { role: AuthRole.SUPER_ADMIN },
    });
    if (!isSuperAdmin) throw Error("Only super admins can access this page");
  },
  loader: () => ({ crumb: "Companies" }),
  component: Outlet,
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});
