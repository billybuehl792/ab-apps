import { type ComponentProps, type FC } from "react";
import { useNavigate } from "@tanstack/react-router";
import { orderBy } from "firebase/firestore";
import { Delete, Edit } from "@mui/icons-material";
import { clientCollection } from "@/firebase/collections";
import { firestoreMutations } from "@/firebase/mutations";
import PaginatedList from "@/components/lists/PaginatedList";
import ClientCard from "@/containers/cards/ClientCard";

interface ClientPaginatedListProps
  extends Partial<
    Omit<ComponentProps<typeof PaginatedList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof ClientCard> } & ComponentProps<
    typeof PaginatedList
  >["slotProps"];
}
const ClientPaginatedList: FC<ClientPaginatedListProps> = ({
  slotProps: { card: cardProps, ...slotProps } = {},
  ...props
}) => {
  /** Values */

  const { remove } = firestoreMutations.useClientMutations();
  const navigate = useNavigate();

  /** Callbacks */

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
              onClick: () => remove.mutate(client.id),
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
