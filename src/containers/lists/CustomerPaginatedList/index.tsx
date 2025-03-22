import { ComponentProps, type FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  addDoc,
  deleteDoc,
  orderBy,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";
import { customerCollection } from "@/firebase/collections";
import CustomerCard from "@/containers/cards/CustomerCard";
import type { CustomerData } from "@/types/global";
import PaginatedList from "@/components/lists/PaginatedList";

interface CustomerPaginatedList
  extends Partial<
    Omit<ComponentProps<typeof PaginatedList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof CustomerCard> } & ComponentProps<
    typeof PaginatedList
  >["slotProps"];
}
const CustomerPaginatedList: FC<CustomerPaginatedList> = ({
  slotProps: { card: cardProps, ...slotProps } = {},
  ...props
}) => {
  /** Values */

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /** Callbacks */

  const handleDeleteCustomer = async (
    customer: QueryDocumentSnapshot<CustomerData>
  ) => {
    try {
      await deleteDoc(customer.ref);
      queryClient.invalidateQueries({
        queryKey: [customerCollection.path],
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleDuplicateCustomer = async (
    customer: QueryDocumentSnapshot<CustomerData>
  ) => {
    const { name, email, phone, address } = customer.data();
    try {
      await addDoc(customer.ref.parent, {
        name: `${name} (Copy)`,
        email,
        phone,
        address,
      });
      queryClient.invalidateQueries({
        queryKey: [customerCollection.path],
      });
    } catch (error) {
      console.error("Error duplicating customer:", error);
    }
  };

  return (
    <PaginatedList
      collection={customerCollection}
      constraints={[orderBy("name")]}
      rowsPerPageOptions={[3, 5, 10]}
      renderItem={(customer) => (
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
          {...cardProps}
        />
      )}
      slotProps={slotProps}
      {...props}
    />
  );
};

export default CustomerPaginatedList;
