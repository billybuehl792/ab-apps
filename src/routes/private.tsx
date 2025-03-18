import { CircularProgress, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/private")({
  component: Private,
});

function Private() {
  const auth = useAuth();

  if (auth.loading)
    return (
      <Stack spacing={2}>
        <Stack>Loading...</Stack>
        <CircularProgress />
      </Stack>
    );
  if (!auth.user) return <Stack>Not Authenticated</Stack>;
  return <Stack>Congrats {auth.user.name}, you are authenticated!</Stack>;
}
