import { type ComponentProps, type FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  addDoc,
  deleteDoc,
  orderBy,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { ContentCopy, Edit, Delete } from "@mui/icons-material";
import { customerCollection } from "@/firebase/collections";
import InfiniteList from "@/components/lists/InfiniteList";
import CustomerCard from "@/containers/cards/CustomerCard";
import type { CustomerData } from "@/types/global";

interface CustomerInfiniteList
  extends Partial<
    Omit<ComponentProps<typeof InfiniteList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof CustomerCard> } & ComponentProps<
    typeof InfiniteList
  >["slotProps"];
}

const CustomerInfiniteList: FC<CustomerInfiniteList> = ({
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
    <InfiniteList
      collection={customerCollection}
      constraints={[orderBy("name")]}
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

export default CustomerInfiniteList;
