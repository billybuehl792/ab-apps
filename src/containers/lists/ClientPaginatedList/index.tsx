import { type ComponentProps } from "react";
import { orderBy, where } from "firebase/firestore";
import { Groups } from "@mui/icons-material";

import clientCollection from "@/lib/collections/firebase/clientCollection";
import PaginatedList from "@/components/lists/PaginatedList";
import ClientCard from "@/containers/cards/ClientCard";
import CreateClientLink from "@/containers/links/CreateClientLink";
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
      collection={clientCollection}
      constraints={[orderBy("first_name"), where("archived", "!=", true)]}
      renderItem={(client) => (
        <ClientCard key={client.id} client={client} {...cardProps} />
      )}
      slotProps={{
        ...slotProps,
        emptyState: {
          text: "No Clients",
          icon: <Groups fontSize="large" color="disabled" />,
          children: <CreateClientLink />,
          ...slotProps.emptyState,
        },
      }}
      {...props}
    />
  );
};

export default ClientPaginatedList;
