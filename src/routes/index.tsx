import { Card, CardContent, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Stack component="section" p={2}>
      <Card>
        <CardContent component={Stack} spacing={1}>
          <Typography variant="h5">Welcome to Home Page</Typography>
          <Typography variant="body2">
            App is currently under construction
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
