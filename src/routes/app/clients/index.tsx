import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  limit,
  orderBy,
  type QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import {
  Skeleton,
  Stack,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { Groups } from "@mui/icons-material";

import CreateClientLink from "@/containers/links/CreateClientLink";
import ClientSearchField from "@/containers/fields/ClientSearchField";
import ClientCard from "@/containers/cards/ClientCard";
import SortAndFilterIconButton from "@/components/buttons/SortAndFilterIconButton";
import { type SortAndFilterFormValues } from "@/components/forms/SortAndFilterForm";
import useClients from "@/hooks/firebase/useClients";
import { useQuery } from "@tanstack/react-query";
import StatusWrapper from "@/components/layout/StatusWrapper";

export const Route = createFileRoute("/app/clients/")({
  component: RouteComponent,
});

const ROWS_PER_PAGE = 10;

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastDocs, setLastDocs] = useState<QueryDocumentSnapshot[]>([]);

  const [sort, setSort] = useState<MenuOption | null>(null);
  const [filters, setFilters] = useState<MenuOption[]>([]);

  /** Values */

  const { queries } = useClients();

  /** Queries */

  const baseConstraints = [where("archived", "!=", true)];
  const countQuery = useQuery(queries.count(...baseConstraints));
  const listQuery = useQuery({
    ...queries.list(
      ...[
        ...baseConstraints,
        ...(sort ? [orderBy(sort.id)] : []),
        limit(ROWS_PER_PAGE),
        ...(lastDocs.length ? [startAfter(lastDocs[lastDocs.length - 1])] : []),
      ]
    ),
    enabled: Boolean(countQuery.isSuccess),
  });

  /** Callbacks */

  const handleSortAndFilterSubmit = (data: SortAndFilterFormValues) => {
    setSort(data.sort);
    setFilters(data.filters);
  };

  const handlePageChange: TablePaginationProps["onPageChange"] = (
    _event,
    page
  ) => {
    if (page < currentPage)
      setLastDocs((current) =>
        current.slice(0, Math.max(current.length - 1, 0))
      );
    else {
      const currentLastDoc = listQuery.data?.docs[listQuery.data.size - 1];
      if (!currentLastDoc) return;
      setLastDocs((current) => [...current, currentLastDoc]);
    }

    setCurrentPage(page);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <ClientSearchField />
        <SortAndFilterIconButton
          values={{ sort, filters }}
          sortOptions={[
            { id: "first_name", label: "First Name" },
            { id: "last_name", label: "Last Name" },
          ]}
          onSubmit={handleSortAndFilterSubmit}
        />
      </Stack>
      <Stack spacing={1}>
        <StatusWrapper
          error={countQuery.error || listQuery.error}
          empty={
            countQuery.isSuccess &&
            countQuery.data.data().count === 0 && {
              text: "No Clients",
              icon: <Groups fontSize="large" color="disabled" />,
              children: <CreateClientLink />,
            }
          }
        >
          {listQuery.data?.docs.map((doc) => (
            <ClientCard key={doc.id} client={{ id: doc.id, ...doc.data() }} />
          ))}
          <TablePagination
            component="div"
            count={countQuery.data?.data().count ?? -1}
            page={currentPage}
            rowsPerPage={ROWS_PER_PAGE}
            rowsPerPageOptions={[]}
            disabled={countQuery.isLoading || listQuery.isLoading}
            labelDisplayedRows={({ from, to, count }) =>
              countQuery.isLoading ? (
                <Skeleton variant="rounded" width={52} />
              ) : (
                `${String(from)} - ${String(to)} of ${String(count)}`
              )
            }
            onPageChange={handlePageChange}
          />
        </StatusWrapper>
      </Stack>
    </Stack>
  );
}
