import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Button,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { getCustomerCount } from "@/firebase/queries";
import CustomerCard from "@/components/cards/CustomerCard";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { Customer } from "@/types/global";

const PAGE_SIZE = 3;

export const Route = createFileRoute("/about/")({
  component: About,
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async () => {
    const count = await getCustomerCount();
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
    queryKey: ["customerList"],
    initialPageParam: {} as DocumentData,
    refetchOnWindowFocus: false,
    gcTime: 0,
    queryFn: async ({ pageParam }) =>
      getDocs(
        query(
          collection(db, "customers"),
          orderBy("name"),
          limit(PAGE_SIZE),
          ...(pageParam?.id ? [startAfter(pageParam)] : [])
        )
      ),
    getNextPageParam: (lastPage, pages) =>
      pages.length * PAGE_SIZE < count ? lastPage.docs.at(-1) : undefined,
  });

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Welcome to About Page</Typography>
      <Stack spacing={1}>
        <Stack spacing={1}>
          {customerListQuery.data?.pages.map((snapshot) =>
            snapshot.docs.map((doc) => (
              <CustomerCard key={doc.id} customer={doc.data() as Customer} />
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
