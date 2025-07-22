import { createFileRoute } from "@tanstack/react-router";
import { Container, Grid2 as Grid, Stack, Typography } from "@mui/material";
import ClientOverviewCard from "@/containers/cards/ClientOverviewCard";
import EstimateCalculatorOverviewCard from "@/containers/cards/EstimateCalculatorOverviewCard";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maxWidth="lg" disableGutters>
      <Stack spacing={1} p={2}>
        <Typography variant="h6">Overview</Typography>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ClientOverviewCard />
          </Grid>
        </Grid>
        <Typography variant="h6">My Apps</Typography>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <EstimateCalculatorOverviewCard />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
