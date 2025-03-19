import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { getCustomerList } from "@/firebase/queries";
import CustomerCard from "@/components/cards/CustomerCard";

export const Route = createFileRoute("/about/")({
  component: About,
});

function About() {
  const customerListQuery = useQuery({
    queryKey: ["customerList"],
    queryFn: () => getCustomerList(),
  });

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Welcome to About Page</Typography>
      <Stack spacing={1}>
        {customerListQuery.isLoading ? (
          <CircularProgress />
        ) : (
          customerListQuery.data?.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        )}
      </Stack>
    </Stack>
  );
}
