import { ComponentProps, type FC } from "react";
import { orderBy } from "firebase/firestore";
import { customerCollection } from "@/firebase/collections";
import PaginatedList from "@/components/lists/PaginatedList";
import CustomerCard from "@/containers/cards/CustomerCard";

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
  return (
    <PaginatedList
      collection={customerCollection}
      constraints={[orderBy("name")]}
      renderItem={(customer) => (
        <CustomerCard key={customer.id} customer={customer} {...cardProps} />
      )}
      slotProps={slotProps}
      {...props}
    />
  );
};

export default CustomerPaginatedList;
