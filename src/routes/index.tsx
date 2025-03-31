import DollarField from "@/components/fields/DollarField";
import IntegerField from "@/components/fields/IntegerField";
import PercentField from "@/components/fields/PercentField";
import { Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Stack spacing={2}>
      <Typography variant="body2">Welcome to Home Page</Typography>
      <DollarField />
      <IntegerField />
      <PercentField />
    </Stack>
  );
}
