import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type QueryDocumentSnapshot } from "firebase/firestore";
import {
  Skeleton,
  Stack,
  type StackProps,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { Groups } from "@mui/icons-material";
import { clientQueries } from "@/store/queries/clients";
import useAuth from "@/hooks/useAuth";
import CreateClientLink from "@/containers/links/CreateClientLink";
import ClientCard from "@/containers/cards/ClientCard";
import SortAndFilterIconButton from "@/components/buttons/SortAndFilterIconButton";
import StatusWrapper from "@/components/layout/StatusWrapper";
import { type SortAndFilterFormValues } from "@/components/forms/SortAndFilterForm";

const ROWS_PER_PAGE = 10;
const SORT_OPTIONS: MenuOption[] = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
];

const ClientList = ({
  companyId: companyIdProp,
  ...props
}: StackProps & { companyId?: string }) => {
  const [lastDocs, setLastDocs] = useState<QueryDocumentSnapshot[]>([]);
  const [selectedSort, setSelectedSort] = useState<MenuOption | null>(null);

  /** Values */

  const { company } = useAuth();
  const companyId = companyIdProp ?? company.id;

  /** Queries */

  const countQuery = useQuery(
    clientQueries.count(companyId, { archived: false })
  );
  const listQuery = useQuery({
    ...clientQueries.list(companyId, {
      archived: false,
      limit: ROWS_PER_PAGE,
      orderBy: selectedSort?.id,
      startAfter: lastDocs[lastDocs.length - 1],
    }),
    enabled: Boolean(countQuery.isSuccess),
  });

  /** Callbacks */

  const handleSortAndFilterSubmit = (data: SortAndFilterFormValues) => {
    setSelectedSort(data.sort);
  };

  const handlePageChange: TablePaginationProps["onPageChange"] = (
    _event,
    page
  ) => {
    if (page < lastDocs.length)
      setLastDocs((current) =>
        current.slice(0, Math.max(current.length - 1, 0))
      );
    else {
      const currentLastDoc = listQuery.data?.docs[listQuery.data.size - 1];
      if (!currentLastDoc) return;
      setLastDocs((current) => [...current, currentLastDoc]);
    }
  };

  return (
    <Stack spacing={1} {...props}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* <ClientSearchField /> */}
        <SortAndFilterIconButton
          values={{ sort: selectedSort, filters: [] }}
          sortOptions={SORT_OPTIONS}
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
          loading={
            (countQuery.isLoading || listQuery.isLoading) && (
              <>
                {Array.from({ length: ROWS_PER_PAGE }).map(() => (
                  <Skeleton
                    key={crypto.randomUUID()}
                    variant="rounded"
                    height={80}
                  />
                ))}
              </>
            )
          }
        >
          {listQuery.data?.docs.map((doc) => (
            <ClientCard key={doc.id} client={{ id: doc.id, ...doc.data() }} />
          ))}
          {countQuery.isSuccess &&
            countQuery.data.data().count > ROWS_PER_PAGE && (
              <TablePagination
                component="div"
                count={countQuery.data.data().count}
                page={lastDocs.length}
                rowsPerPage={ROWS_PER_PAGE}
                rowsPerPageOptions={[]}
                disabled={listQuery.isLoading}
                labelDisplayedRows={({ from, to, count }) =>
                  `${String(from)} - ${String(to)} of ${String(count)}`
                }
                onPageChange={handlePageChange}
              />
            )}
        </StatusWrapper>
      </Stack>
    </Stack>
  );
};

export default ClientList;
