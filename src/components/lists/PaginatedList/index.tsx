import { type ReactNode, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";

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
 * A component that renders a paginated list of items from a Firestore collection.
 *
 * @template T - The type of the Firestore document data.
 * @param {PaginatedListProps<T>} props - The props for the component.
 * @param {CollectionReference<T>} props.collection - The Firestore collection to query.
 * @param {QueryConstraint[]} [props.constraints] - An optional array of query constraints to filter the collection.
 * @param {number[]} [props.rowsPerPageOptions] - An optional array of rows per page options for pagination.
 * @param {(item: T & Pick<QueryDocumentSnapshot, "id">) => ReactNode} props.renderItem - A function to render each item in the list.
 * @param {object} [props.slotProps] - Optional slot props for customizing pagination and skeleton components.
 * @param {TablePaginationProps} [props.slotProps.pagination] - Props for the pagination component.
 * @param {SkeletonProps} [props.slotProps.skeleton] - Props for the skeleton component.
 * @returns {ReactNode} The rendered paginated list.
 */
const PaginatedList = <T extends DocumentData = DocumentData>({
  collection,
  constraints = [],
  rowsPerPageOptions = [10, 20, 30],
  renderItem,
  slotProps: { pagination: paginationProps, skeleton: skeletonProps } = {},
  ...props
}: PaginatedListProps<T>): ReactNode => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);
  const [lastDocs, setLastDocs] = useState<QueryDocumentSnapshot[]>([]);

  /** Values */

  const lastDoc = lastDocs.at(-1);

  /** Queries */

  const countQuery = useQuery({
    queryKey: [collection.id, "count", ...constraints] as const,
    queryFn: ({ queryKey: [_, __, ...constraints] }) =>
      getCountFromServer(query(collection, ...constraints)),
  });
  const count = countQuery.data?.data().count ?? Infinity;

  const listQuery = useQuery({
    queryKey: [
      collection.id,
      ...[
        ...constraints,
        limit(rowsPerPage),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
      ],
    ] as const,
    queryFn: ({ queryKey: [_, ...constraints] }) =>
      getDocs(query(collection, ...constraints)),
    enabled: countQuery.isSuccess,
  });

  /** Callbacks */

  const onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"] = (
    event
  ) => {
    const value = +event.target.value;

    setLastDocs([]);
    setCurrentPage(0);
    setRowsPerPage(value);
  };

  const onPageChange: TablePaginationProps["onPageChange"] = (_event, page) => {
    if (page < currentPage)
      setLastDocs((current) =>
        current.slice(0, Math.max(current.length - 1, 0))
      );
    else {
      const currentLastDoc = listQuery.data?.docs.at(-1);
      if (!currentLastDoc) return;
      setLastDocs((current) => [...current, currentLastDoc]);
    }

    setCurrentPage(page);
  };

  return (
    <Stack spacing={1} {...props}>
      {countQuery.isLoading || listQuery.isLoading
        ? Array(Math.min(rowsPerPage, count - currentPage * rowsPerPage))
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        {...paginationProps}
      />
    </Stack>
  );
};

export default PaginatedList;
