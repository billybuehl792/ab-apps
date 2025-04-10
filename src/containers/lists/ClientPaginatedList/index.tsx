import { type ComponentProps, type FC } from "react";
import { useNavigate } from "@tanstack/react-router";
import { orderBy } from "firebase/firestore";
import { Delete, Edit } from "@mui/icons-material";

import clients from "@/lib/collections/firebase/clients";
import useClients from "@/hooks/firebase/useClients";
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
              onClick: () => archive.mutate(client.id),
            },
          ]}
          onClick={() => navigate({ to: `/clients/${client.id}` })}
          {...cardProps}
        />
      )}
      slotProps={slotProps}
      {...props}
    />
  );
};

export default ClientPaginatedList;
