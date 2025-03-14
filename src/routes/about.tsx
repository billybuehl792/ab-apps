import { createFileRoute } from "@tanstack/react-router";
import { Stack } from "@mui/material";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return <Stack spacing={2}>Welcome to About Page</Stack>;
}
