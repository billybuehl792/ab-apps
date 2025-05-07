import { type ComponentProps } from "react";
import { useNavigate } from "@tanstack/react-router";
import { orderBy } from "firebase/firestore";
import { Delete, Edit } from "@mui/icons-material";

import clients from "@/lib/collections/firebase/clients";
import useClients from "@/hooks/firebase/useClients";
import InfiniteList from "@/components/lists/InfiniteList";
import ClientCard from "@/containers/cards/ClientCard";
import { EMPTY_OBJECT } from "@/constants/utility";

interface ClientInfiniteListProps
  extends Partial<
    Omit<ComponentProps<typeof InfiniteList>, "collection" | "slotProps">
  > {
  slotProps?: { card?: ComponentProps<typeof ClientCard> } & ComponentProps<
    typeof InfiniteList
  >["slotProps"];
}

const ClientInfiniteList = ({
  slotProps: { card: cardProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: ClientInfiniteListProps) => {
  /** Values */

  const { archive } = useClients();
  const navigate = useNavigate();

  /** Callbacks */

  return (
    <InfiniteList
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
              confirm:
                "Are you sure you want to delete this client? This action cannot be undone.",
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

export default ClientInfiniteList;
