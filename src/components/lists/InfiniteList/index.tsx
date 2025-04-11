import { type ReactNode } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
import {
  Button,
  type ButtonProps,
  Skeleton,
  type SkeletonProps,
  Stack,
  type StackProps,
} from "@mui/material";

import { EMPTY_ARRAY, EMPTY_OBJECT } from "@/constants/utility";

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
 * @param {CollectionReference<T>} props.collection - The Firestore collection to query.
 * @param {number} [props.pageSize=10] - The number of items to fetch per page.
 * @param {QueryConstraint[]} [props.constraints] - An array of query constraints to filter or modify the query.
 * @returns {ReactNode} The rendered infinite list component.
 */
const InfiniteList = <T extends DocumentData = DocumentData>({
  collection,
  constraints = EMPTY_ARRAY,
  pageSize = 10,
  renderItem,
  slotProps: {
    loadMoreButton: loadMoreButtonProps,
    skeleton: skeletonProps,
  } = EMPTY_OBJECT,
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
    queryKey: [collection.id, ...[limit(pageSize), ...constraints]] as const,
    initialPageParam: {} as QueryDocumentSnapshot,
    queryFn: ({ queryKey: [_, ...constraints], pageParam }) =>
      getDocs(
        query(
          collection,
          ...constraints,
          ...(pageParam.id ? [startAfter(pageParam)] : [])
        )
      ),
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, page) => acc + page.size, 0) < count
        ? lastPage.docs[lastPage.size - 1]
        : null,
    enabled: countQuery.isSuccess && count > 0,
  });

  return (
    <Stack spacing={1} {...props}>
      {listQuery.data?.pages.map((page) =>
        page.docs.map((doc) => renderItem({ id: doc.id, ...doc.data() }))
      )}
      {(countQuery.isLoading ||
        listQuery.isLoading ||
        listQuery.isFetchingNextPage) &&
        Array(pageSize)
          .fill(null)
          .map(() => (
            <Skeleton
              key={crypto.randomUUID()}
              height={82}
              variant="rounded"
              {...skeletonProps}
            />
          ))}

      {listQuery.hasNextPage && (
        <Button
          loading={listQuery.isFetchingNextPage}
          onClick={() => {
            void listQuery.fetchNextPage();
          }}
          {...loadMoreButtonProps}
        >
          Load More
        </Button>
      )}
    </Stack>
  );
};

export default InfiniteList;
