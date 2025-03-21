import { type ReactNode } from "react";
import {
  getCountFromServer,
  getDocs,
  query,
  type QueryDocumentSnapshot,
  startAfter,
  type DocumentData,
  type CollectionReference,
  type QueryNonFilterConstraint,
  limit,
} from "firebase/firestore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Button,
  type ButtonProps,
  Skeleton,
  type SkeletonProps,
  Stack,
  type StackProps,
} from "@mui/material";

interface PaginatedListProps<T extends DocumentData = DocumentData>
  extends StackProps {
  collection: CollectionReference<T>;
  pageSize?: number;
  constraints?: QueryNonFilterConstraint[];
  renderItem: (item: QueryDocumentSnapshot<T>) => ReactNode;
  slotProps?: {
    loadMoreButton?: ButtonProps;
    skeleton?: SkeletonProps;
  };
}

/**
 * This component renders an infinite list of items from a Firestore collection.
 * @param {PaginatedListProps} props
 * @param {CollectionReference} props.collection - The Firestore collection to query.
 * @param {number} [props.pageSize=10] - The number of items to fetch per page.
 * @param {QueryNonFilterConstraint[]} [props.constraints] - An array of query constraints.
 * @param {(item: QueryDocumentSnapshot) => ReactNode} props.renderItem - A function that renders each item in the list.
 * @returns {ReactNode}
 */
const InfiniteList = <T extends DocumentData = DocumentData>({
  collection,
  constraints = [],
  pageSize = 5,
  renderItem,
  slotProps: {
    loadMoreButton: loadMoreButtonProps,
    skeleton: skeletonProps,
  } = {},
  ...props
}: PaginatedListProps<T>): ReactNode => {
  /** Queries */

  const countQuery = useQuery({
    queryKey: [collection.id, getCountFromServer, ...constraints] as const,
    queryFn: ({ queryKey: [_, fn, ...constraints] }) =>
      fn(query(collection, ...constraints)),
  });
  const count = countQuery.data?.data().count ?? 0;

  const listQuery = useInfiniteQuery({
    queryKey: [
      collection.id,
      getDocs,
      "infinite",
      ...[limit(pageSize), ...constraints],
    ] as const,
    initialPageParam: {} as QueryDocumentSnapshot<T>,
    queryFn: ({ queryKey: [_, fn, __, ...constraints], pageParam }) =>
      fn(
        query(
          collection,
          ...constraints,
          ...(pageParam?.id ? [startAfter(pageParam)] : [])
        )
      ),
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, doc) => acc + doc.size, 0) < count
        ? (lastPage.docs.at(-1) ?? null)
        : null,
    enabled: Boolean(count),
  });

  return (
    <Stack spacing={1} {...props}>
      {listQuery.data?.pages.map((snapshot) => snapshot.docs.map(renderItem))}
      {(countQuery.isLoading ||
        listQuery.isLoading ||
        listQuery.isFetchingNextPage) &&
        Array(pageSize)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              height={82}
              variant="rounded"
              {...skeletonProps}
            />
          ))}

      {listQuery.hasNextPage && (
        <Button
          loading={listQuery.isFetchingNextPage}
          onClick={() => listQuery.fetchNextPage()}
          {...loadMoreButtonProps}
        >
          Load More
        </Button>
      )}
    </Stack>
  );
};

export default InfiniteList;
