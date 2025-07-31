import { createFileRoute } from "@tanstack/react-router";
import { Container, Stack, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import UserRecordDetailCard from "@/containers/cards/UserRecordDetailCard";

export const Route = createFileRoute("/app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const { user } = useAuth();

  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6" noWrap>
          Profile
        </Typography>
        <UserRecordDetailCard user={user?.uid ?? ""} />
      </Stack>
    </Container>
  );
}
