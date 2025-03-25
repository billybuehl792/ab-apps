import { type ComponentProps, type FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteDoc, orderBy, QueryDocumentSnapshot } from "firebase/firestore";
import { Delete, Edit } from "@mui/icons-material";
import { clientCollection } from "@/firebase/collections";
import PaginatedList from "@/components/lists/PaginatedList";
import ClientCard from "@/containers/cards/ClientCard";
import type { ClientData } from "@/firebase/types";

interface ClientPaginatedList
  extends Partial<
    Omit<ComponentProps<typeof PaginatedList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof ClientCard> } & ComponentProps<
    typeof PaginatedList
  >["slotProps"];
}
const ClientPaginatedList: FC<ClientPaginatedList> = ({
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
    <PaginatedList
      collection={clientCollection}
      constraints={[orderBy("last_name")]}
      rowsPerPageOptions={[3, 5, 10]}
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

export default ClientPaginatedList;
