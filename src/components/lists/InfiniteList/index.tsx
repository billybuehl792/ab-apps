import { type ReactNode } from "react";
import {
  getCountFromServer,
  getDocs,
  query,
  type QueryDocumentSnapshot,
  startAfter,
  type DocumentData,
  type CollectionReference,
  limit,
  type QueryConstraint,
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

interface InfiniteListProps<T extends DocumentData = DocumentData>
  extends StackProps {
  collection: CollectionReference<T>;
  pageSize?: number;
  constraints?: QueryConstraint[];
  renderItem: (item: T & Pick<QueryDocumentSnapshot, "id">) => ReactNode;
  slotProps?: {
    loadMoreButton?: ButtonProps;
    skeleton?: SkeletonProps;
  };
}

/**
 * This component renders an infinite list of items from a Firestore collection.
 *
 * @template T - The type of the Firestore document data.
 * @param {InfiniteListProps<T>} props - The props for the InfiniteList component.
 * @param {CollectionReference<T>} props.collection - The Firestore collection to query.
 * @param {number} [props.pageSize=10] - The number of items to fetch per page.
 * @param {QueryConstraint[]} [props.constraints] - An array of query constraints to filter or modify the query.
 * @param {(item: T & Pick<QueryDocumentSnapshot, "id">) => ReactNode} props.renderItem - A function that renders each item in the list.
 * @param {object} [props.slotProps] - Additional props for customizing child components.
 * @param {ButtonProps} [props.slotProps.loadMoreButton] - Props for the "Load More" button.
 * @param {SkeletonProps} [props.slotProps.skeleton] - Props for the skeleton loader.
 * @returns {ReactNode} The rendered infinite list component.
 */
const InfiniteList = <T extends DocumentData = DocumentData>({
  collection,
  constraints = [],
  pageSize = 10,
  renderItem,
  slotProps: {
    loadMoreButton: loadMoreButtonProps,
    skeleton: skeletonProps,
  } = {},
  ...props
}: InfiniteListProps<T>): ReactNode => {
  /** Queries */

  const countQuery = useQuery({
    queryKey: [collection.id, "count", ...constraints] as const,
    queryFn: ({ queryKey: [_, __, ...constraints] }) =>
      getCountFromServer(query(collection, ...constraints)),
  });
  const count = countQuery.data?.data().count ?? 0;

  const listQuery = useInfiniteQuery({
    queryKey: [
      collection.id,
      "infinite",
      ...[limit(pageSize), ...constraints],
    ] as const,
    initialPageParam: {} as Pick<QueryDocumentSnapshot, "id">,
    queryFn: async ({ queryKey: [_, __, ...constraints], pageParam }) => {
      const q = query(
        collection,
        ...constraints,
        ...(pageParam?.id ? [startAfter(pageParam)] : [])
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, page) => acc + page.length, 0) < count
        ? (lastPage.at(-1) ?? null)
        : null,
    enabled: countQuery.isSuccess && count > 0,
  });

  return (
    <Stack spacing={1} {...props}>
      {listQuery.data?.pages.map((page) => page.map(renderItem))}
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
