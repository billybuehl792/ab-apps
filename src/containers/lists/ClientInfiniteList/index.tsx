import { type ComponentProps, type FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  deleteDoc,
  orderBy,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { Edit, Delete } from "@mui/icons-material";
import { clientCollection } from "@/firebase/collections";
import InfiniteList from "@/components/lists/InfiniteList";
import ClientCard from "@/containers/cards/ClientCard";
import type { ClientData } from "@/types/global";

interface ClientInfiniteList
  extends Partial<
    Omit<ComponentProps<typeof InfiniteList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof ClientCard> } & ComponentProps<
    typeof InfiniteList
  >["slotProps"];
}

const ClientInfiniteList: FC<ClientInfiniteList> = ({
  slotProps: { card: cardProps, ...slotProps } = {},
  ...props
}) => {
  /** Values */

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /** Callbacks */

  const handleDeleteClient = async (
    client: QueryDocumentSnapshot<ClientData>
  ) => {
    try {
      await deleteDoc(client.ref);
      queryClient.invalidateQueries({
        queryKey: [clientCollection.path],
      });
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <InfiniteList
      collection={clientCollection}
      constraints={[orderBy("last_name")]}
      renderItem={(client) => (
        <ClientCard
          key={client.id}
          client={client}
          options={[
            {
              id: "edit",
              label: "Edit",
              icon: <Edit />,
              onClick: () => navigate({ to: `/clients/${client.id}` }),
            },
            {
              id: "delete",
              label: "Delete",
              icon: <Delete />,
              onClick: () => handleDeleteClient(client),
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

export default ClientInfiniteList;
