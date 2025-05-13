import { Card, CardContent, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack p={2}>
      <Card>
        <CardContent>
          <Typography variant="h6">Welcome to AB Apps</Typography>
          <Typography variant="body2">
            App is currently under construction
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
