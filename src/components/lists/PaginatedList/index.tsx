import { type ReactNode, useState } from "react";
import {
  limit,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
  type DocumentData,
} from "firebase/firestore";
import {
  Skeleton,
  Stack,
  type StackProps,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { QueryKey } from "@/types/global";

const ROWS_PER_PAGE_OPTIONS = [3, 5, 10];

interface PaginatedListProps<T extends DocumentData = DocumentData>
  extends StackProps {
  count: number;
  queryOptions: UseQueryOptions<
    QuerySnapshot<T>,
    Error,
    QuerySnapshot<T>,
    QueryKey
  >;
  renderItem: (item: QueryDocumentSnapshot<T>) => ReactNode;
}

const PaginatedList = <T extends DocumentData = DocumentData>({
  count,
  queryOptions,
  renderItem,
  ...props
}: PaginatedListProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [lastDocs, setLastDocs] = useState<DocumentData[]>([]);

  /** Values */

  const lastDoc = lastDocs.at(-1);

  /** Queries */

  const [identifier, { constraints = [] }] = queryOptions.queryKey;
  const filteredConstraints = constraints.filter(
    (constraint) => !["startAfter", "limit"].includes(constraint.type)
  );
  const query = useQuery({
    ...queryOptions,
    queryKey: [
      identifier,
      {
        constraints: [
          ...filteredConstraints,
          limit(rowsPerPage),
          ...(lastDoc ? [startAfter(lastDoc)] : []),
        ],
      },
    ],
  });

  /** Callbacks */

  const onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"] = (
    event
  ) => {
    const value = +event.target.value;

    setCurrentPage(0);
    setRowsPerPage(value);
  };

  const onPageChange: TablePaginationProps["onPageChange"] = (_event, page) => {
    if (page < currentPage)
      setLastDocs((current) =>
        current.slice(0, Math.max(current.length - 1, 0))
      );
    else {
      const currentLastDoc = query.data?.docs.at(-1);
      if (!currentLastDoc) return;
      setLastDocs((current) => [...current, currentLastDoc]);
    }

    setCurrentPage(page);
  };

  return (
    <Stack spacing={2} {...props}>
      <Stack spacing={1}>
        {query.isLoading
          ? Array(Math.min(rowsPerPage, count - currentPage * rowsPerPage))
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} height={82} variant="rounded" />
              ))
          : query.data?.docs.map(renderItem)}
      </Stack>

      <TablePagination
        component="div"
        count={count}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        disabled={query.isLoading}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Stack>
  );
};

export default PaginatedList;
