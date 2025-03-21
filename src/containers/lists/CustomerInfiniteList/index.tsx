import { type ComponentProps, type FC } from "react";
import { orderBy } from "firebase/firestore";
import { customerCollection } from "@/firebase/collections";
import InfiniteList from "@/components/lists/InfiniteList";
import CustomerCard from "@/containers/cards/CustomerCard";

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
  return (
    <InfiniteList
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

export default CustomerInfiniteList;
