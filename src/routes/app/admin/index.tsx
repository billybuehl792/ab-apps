import { People, Store } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const items: ListItem[] = [
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
  ];

  return (
    <Grid container spacing={1}>
      {items.map((item) => (
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
  );
}
