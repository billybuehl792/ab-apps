import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { deleteCustomer, getCustomerList } from "@/firebase/db";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import CustomerCard from "@/components/cards/CustomerCard";
import type { Customer } from "@/types/global";

export const Route = createFileRoute("/customers/")({
  component: Customers,
  loader: async ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");

    const customers = await getCustomerList();
    return { customers };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Customers() {
  /** Values */

  const router = useRouter();
  const navigate = useNavigate();
  const { customers } = Route.useLoaderData();

  /** Callbacks */

  const handleDeleteCustomer = async (customer: Customer) => {
    try {
      await deleteCustomer(customer.id);
      router.invalidate();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1">Customers</Typography>
      <Stack spacing={1}>
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            options={[
              {
                id: "edit",
                label: "Edit",
                icon: <Edit />,
                onClick: () => navigate({ to: `/customers/${customer.id}` }),
              },
              {
                id: "delete",
                label: "Delete",
                icon: <Delete />,
                onClick: () => handleDeleteCustomer(customer),
              },
            ]}
            onClick={() => navigate({ to: `/customers/${customer.id}` })}
          />
        ))}
        <Stack direction="row">
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate({ to: "/customers/create" })}
          >
            Customer
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
