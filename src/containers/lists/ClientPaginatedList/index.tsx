import { type ComponentProps } from "react";
import { orderBy } from "firebase/firestore";
import { Groups } from "@mui/icons-material";

import clients from "@/lib/collections/firebase/clients";
import PaginatedList from "@/components/lists/PaginatedList";
import ClientCard from "@/containers/cards/ClientCard";
import { EMPTY_OBJECT } from "@/constants/utility";

interface ClientPaginatedListProps
  extends Partial<
    Omit<ComponentProps<typeof PaginatedList>, "collection" | "slotProps">
  > {
  slotProps?: {
    card?: Partial<ComponentProps<typeof ClientCard>>;
  } & ComponentProps<typeof PaginatedList>["slotProps"];
}

const ClientPaginatedList = ({
  slotProps: { card: cardProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: ClientPaginatedListProps) => {
  return (
    <PaginatedList
      collection={clients}
      constraints={[orderBy("first_name")]}
      renderItem={(client) => (
        <ClientCard key={client.id} client={client} {...cardProps} />
      )}
      slotProps={{
        ...slotProps,
        emptyState: {
          text: "No Clients",
          icon: <Groups fontSize="large" color="disabled" />,
          ...slotProps.emptyState,
        },
      }}
      {...props}
    />
  );
};

export default ClientPaginatedList;
