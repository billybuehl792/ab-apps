import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Button,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { getCustomerCount, getCustomerList } from "@/firebase/api";
import CustomerCard from "@/containers/cards/CustomerCard";
import {
  limit,
  orderBy,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { getQueryKey } from "@/utils/queries";
import type { Customer } from "@/types/global";

const PAGE_SIZE = 3;

export const Route = createFileRoute("/about/")({
  component: About,
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async () => {
    const count = (await getCustomerCount()).data().count;
    return { count };
  },
  pendingComponent: () => <CircularProgress />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function About() {
  /** Values */

  const { count } = Route.useLoaderData();

  /** Queries */

  const customerListQuery = useInfiniteQuery({
    queryKey: getQueryKey("customerInfiniteList", {
      constraints: [orderBy("name"), limit(PAGE_SIZE)],
    }),
    initialPageParam: {} as QueryDocumentSnapshot<Customer>,
    queryFn: ({ queryKey: [_, { constraints = [] }], pageParam }) =>
      getCustomerList({
        constraints: [
          ...constraints,
          ...(pageParam?.id ? [startAfter(pageParam)] : []),
        ],
      }),
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, doc) => acc + doc.docs?.length, 0) < count
        ? lastPage.docs.at(-1)
        : null,
  });

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Welcome to About Page</Typography>
      <Stack spacing={1}>
        <Stack spacing={1}>
          {customerListQuery.data?.pages.map((snapshot) =>
            snapshot.docs.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))
          )}
          {(customerListQuery.isFetchingNextPage ||
            customerListQuery.isLoading) &&
            Array(PAGE_SIZE)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} height={82} variant="rounded" />
              ))}
        </Stack>

        {customerListQuery.hasNextPage && (
          <Button
            loading={customerListQuery.isFetchingNextPage}
            onClick={() => customerListQuery.fetchNextPage()}
          >
            Load More
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
