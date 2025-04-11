import { type ComponentProps } from "react";
import { useNavigate } from "@tanstack/react-router";
import { orderBy } from "firebase/firestore";
import { Delete, Edit } from "@mui/icons-material";

import clients from "@/lib/collections/firebase/clients";
import useClients from "@/hooks/firebase/useClients";
import PaginatedList from "@/components/lists/PaginatedList";
import ClientCard from "@/containers/cards/ClientCard";
import { EMPTY_OBJECT } from "@/constants/utility";

interface ClientPaginatedListProps
  extends Partial<
    Omit<ComponentProps<typeof PaginatedList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof ClientCard> } & ComponentProps<
    typeof PaginatedList
  >["slotProps"];
}

const ClientPaginatedList = ({
  slotProps: { card: cardProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: ClientPaginatedListProps) => {
  /** Values */

  const { archive } = useClients();
  const navigate = useNavigate();

  return (
    <PaginatedList
      collection={clients}
      constraints={[orderBy("first_name")]}
      renderItem={(client) => (
        <ClientCard
          key={client.id}
          client={client}
          options={[
            {
              id: "edit",
              label: "Edit",
              icon: <Edit />,
              onClick: () =>
                navigate({
                  to: `/clients/${client.id}`,
                  search: { edit: true },
                }),
            },
            {
              id: "delete",
              label: "Delete",
              icon: <Delete />,
              onClick: () => {
                archive.mutate(client.id);
              },
            },
          ]}
          onClick={() => {
            void navigate({ to: `/clients/${client.id}` });
          }}
          {...cardProps}
        />
      )}
      slotProps={slotProps}
      {...props}
    />
  );
};

export default ClientPaginatedList;
