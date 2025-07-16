import { People } from "@mui/icons-material";
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
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card>
          <CardActionArea component={Link} to="/app/admin/users">
            <CardContent component={Stack} spacing={1}>
              <People fontSize="large" />
              <Typography variant="body2" noWrap>
                Users
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
