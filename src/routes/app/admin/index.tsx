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
import { AdminPanelSettings, People, Store } from "@mui/icons-material";
import { authUtils } from "@/store/utils/auth";
import { AuthRole } from "@/store/enums/auth";

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
      render: authUtils.authGuard(auth, {
        permissions: { role: AuthRole.SUPER_ADMIN },
      }),
      items: [
        {
          id: "users",
          label: "Users",
          icon: <People fontSize="large" />,
          link: { to: "/app/admin/users" },
        },
        {
          id: "companies",
          label: "Companies",
          icon: <Store fontSize="large" />,
          link: { to: "/app/admin/companies" },
        },
      ],
    },
  ];

  return (
    <Stack spacing={2}>
      <StatusWrapper
        empty={!sections.find((s) => s.render !== false)}
        slotProps={{
          emptyState: {
            icon: <AdminPanelSettings fontSize="large" color="disabled" />,
            description: "No admin sections currently available",
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
                      <CardActionArea
                        {...(!!item.link && {
                          LinkComponent: Link,
                          ...item.link,
                        })}
                      >
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
