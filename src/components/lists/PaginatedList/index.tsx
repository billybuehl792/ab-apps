import { type ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
  type DocumentData,
  type CollectionReference,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  Skeleton,
  type SkeletonProps,
  Stack,
  type StackProps,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "@/constants/utility";

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 30];

interface PaginatedListProps<T extends DocumentData = DocumentData>
  extends StackProps {
  collection: CollectionReference<T>;
  constraints?: QueryConstraint[];
  rowsPerPageOptions?: number[];
  renderItem: (item: T & Pick<QueryDocumentSnapshot, "id">) => ReactNode;
  slotProps?: {
    pagination?: TablePaginationProps;
    skeleton?: SkeletonProps;
  };
}

/**
 * This component renders a paginated list of items from a Firestore collection.
 *
 * @template T - The type of the Firestore document data.
 * @param {CollectionReference<T>} props.collection - The Firestore collection to query.
 * @param {QueryConstraint[]} [props.constraints] - An optional array of query constraints to filter the collection.
 * @returns {ReactNode} The rendered paginated list.
 */
const PaginatedList = <T extends DocumentData = DocumentData>({
  collection,
  constraints = EMPTY_ARRAY,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  renderItem,
  slotProps: {
    pagination: paginationProps,
    skeleton: skeletonProps,
  } = EMPTY_OBJECT,
  ...props
}: PaginatedListProps<T>): ReactNode => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);
  const [lastDocs, setLastDocs] =
    useState<QueryDocumentSnapshot[]>(EMPTY_ARRAY);

  /** Queries */

  const countQuery = useQuery({
    queryKey: [collection.id, "count", ...constraints] as const,
    queryFn: ({ queryKey: [_, __, ...constraints] }) =>
      getCountFromServer(query(collection, ...constraints)),
  });
  const count = countQuery.data?.data().count ?? 0;
  const skeletonCount = countQuery.isLoading
    ? rowsPerPage
    : Math.min(rowsPerPage, count - currentPage * rowsPerPage);

  const listQuery = useQuery({
    queryKey: [
      collection.id,
      ...[
        ...constraints,
        limit(rowsPerPage),
        ...(lastDocs.length
          ? [startAfter(lastDocs[lastDocs.length - 1])]
          : EMPTY_ARRAY),
      ],
    ] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(collection, ...constraints)),
    enabled: countQuery.isSuccess && count > 0,
  });

  /** Callbacks */

  const onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"] = (
    event
  ) => {
    setLastDocs([]);
    setCurrentPage(0);
    setRowsPerPage(+event.target.value);
  };

  const onPageChange: TablePaginationProps["onPageChange"] = (_event, page) => {
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
    <Stack spacing={1} {...props}>
      {countQuery.isLoading || listQuery.isLoading
        ? Array(skeletonCount)
            .fill(null)
            .map(() => (
              <Skeleton
                key={crypto.randomUUID()}
                height={82}
                variant="rounded"
                {...skeletonProps}
              />
            ))
        : listQuery.data?.docs.map((doc) =>
            renderItem({ id: doc.id, ...doc.data() })
          )}
      <TablePagination
        component="div"
        count={count}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        disabled={countQuery.isLoading || listQuery.isLoading}
        labelDisplayedRows={({ from, to, count }) =>
          countQuery.isLoading ? (
            <Skeleton variant="rounded" width={52} />
          ) : (
            `${String(from)} - ${String(to)} of ${String(count)}`
          )
        }
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        {...paginationProps}
      />
    </Stack>
  );
};

export default PaginatedList;
