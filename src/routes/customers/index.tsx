import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { orderBy } from "firebase/firestore";
import {
  createCustomer,
  deleteCustomer,
  getCustomerCount,
  getCustomerList,
} from "@/firebase/queries";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Add, ContentCopy, Delete, Edit } from "@mui/icons-material";
import CustomerCard from "@/components/cards/CustomerCard";
import type { Customer } from "@/types/global";

export const Route = createFileRoute("/customers/")({
  component: Customers,
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async () => {
    const count = await getCustomerCount();
    const customers = await getCustomerList(orderBy("name"));

    return { customers, count };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function Customers() {
  /** Values */

  const router = useRouter();
  const navigate = useNavigate();
  const { customers, count } = Route.useLoaderData();

  /** Callbacks */

  const handleDeleteCustomer = async (customer: Customer) => {
    try {
      await deleteCustomer(customer.id);
      router.invalidate();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleDuplicateCustomer = async (customer: Customer) => {
    try {
      await createCustomer({
        name: `${customer.name} (Copy)`,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      });
      router.invalidate();
    } catch (error) {
      console.error("Error duplicating customer:", error);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        Customers <Box component="span">({count})</Box>
      </Typography>
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
                id: "duplicate",
                label: "Duplicate",
                icon: <ContentCopy />,
                onClick: () => handleDuplicateCustomer(customer),
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
