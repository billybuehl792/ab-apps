import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import useAuth from "@/store/hooks/useAuth";
import StatusWrapper from "@/components/layout/StatusWrapper";
import { AuthRoleLevel } from "@/store/constants/auth";
import { AdminPanelSettings, People, Store } from "@mui/icons-material";

export const Route = createFileRoute("/app/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const auth = useAuth();

  const sections: ListItem[] = [
    {
      id: "AB Admin",
      label: "AB Admin",
      render:
        !!auth.permissions.role &&
        AuthRoleLevel[auth.permissions.role] >= AuthRoleLevel.super_admin,
      items: [
        {
          id: "users",
          label: "Users",
          icon: <People fontSize="large" />,
          to: "/app/admin/users",
        },
        {
          id: "companies",
          label: "Companies",
          icon: <Store fontSize="large" />,
          to: "/app/admin/companies",
        },
      ],
    },
  ];

  return (
    <Stack spacing={2} p={2}>
      <StatusWrapper
        empty={!sections.find((s) => s.render !== false)}
        slotProps={{
          emptyState: {
            icon: <AdminPanelSettings fontSize="large" color="disabled" />,
            text: "No admin sections currently available",
          },
        }}
      >
        {sections
          .filter((section) => section.render !== false)
          .map((section) => (
            <Stack key={section.id} spacing={1}>
              <Typography variant="h6">{section.label}</Typography>
              <Grid container spacing={1}>
                {section.items?.map((item) => (
                  <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                      <CardActionArea component={Link} to={item.to}>
                        <CardContent component={Stack} spacing={1}>
                          {item.icon}
                          <Typography variant="body2" noWrap>
                            {item.label}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
      </StatusWrapper>
    </Stack>
  );
}
