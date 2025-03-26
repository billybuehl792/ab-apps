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

interface PaginatedList<T extends DocumentData = DocumentData>
  extends StackProps {
  collection: CollectionReference<T>;
  constraints?: QueryConstraint[];
  rowsPerPageOptions?: number[];
  renderItem: (item: T & { id: string }) => ReactNode;
  slotProps?: {
    pagination?: TablePaginationProps;
    skeleton?: SkeletonProps;
  };
}

/**
 * This component renders a paginated list of items from a Firestore collection.
 * @param {PaginatedList} props
 * @param {CollectionReference} props.collection - The Firestore collection to query.
 * @param {QueryConstraint[]} [props.constraints] - An array of query constraints.
 * @param {(item: QueryDocumentSnapshot) => ReactNode} props.renderItem - A function that renders each item in the list.
 * @returns {ReactNode}
 */
const PaginatedList = <T extends DocumentData = DocumentData>({
  collection,
  constraints = [],
  rowsPerPageOptions = [10, 20, 30],
  renderItem,
  slotProps: { pagination: paginationProps, skeleton: skeletonProps } = {},
  ...props
}: PaginatedList<T>): ReactNode => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);
  const [lastDocs, setLastDocs] = useState<DocumentData[]>([]);

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
    queryFn: async ({ queryKey: [_, ...constraints] }) => {
      const q = query(collection, ...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
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
      const currentLastDoc = listQuery.data?.at(-1);
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
        : listQuery.data?.map(renderItem)}
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
