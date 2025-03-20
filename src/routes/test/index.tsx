import { useState } from "react";
import CustomerCard from "@/components/cards/CustomerCard";
import { getCustomerCount, getCustomerList2 } from "@/firebase/queries";
import {
  CircularProgress,
  Skeleton,
  Stack,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  endBefore,
  limit,
  limitToLast,
  orderBy,
  startAfter,
  type QueryNonFilterConstraint,
} from "firebase/firestore";

export const Route = createFileRoute("/test/")({
  component: Test,
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

function Test() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [constraints, setConstraints] = useState<QueryNonFilterConstraint[]>([
    limit(rowsPerPage),
  ]);

  /** Values */

  const { count } = Route.useLoaderData();

  /** Queries */

  const customerListQuery = useQuery({
    queryKey: ["customerList", constraints] as const,
    queryFn: ({ queryKey: [_, constraints] }) =>
      getCustomerList2(orderBy("name"), ...constraints),
  });

  /** Callbacks */

  const onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"] = (
    event
  ) => {
    const value = +event.target.value;

    setPage(0);
    setRowsPerPage(value);
    setConstraints([limit(value)]);
  };

  const onPageChange: TablePaginationProps["onPageChange"] = (_event, p) => {
    if (p < page) handlePreviousPage();
    else handleNextPage();

    setPage(p);
  };

  const handleNextPage = () => {
    const lastDoc =
      customerListQuery.data?.docs[customerListQuery.data.docs.length - 1];

    setConstraints([
      limit(rowsPerPage),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
    ]);
  };

  const handlePreviousPage = () => {
    const firstDoc = customerListQuery.data?.docs[0];

    setConstraints([
      limitToLast(rowsPerPage),
      ...(firstDoc ? [endBefore(firstDoc)] : []),
    ]);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        {customerListQuery.isLoading
          ? Array(Math.min(rowsPerPage, count - page * rowsPerPage))
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} height={82} variant="rounded" />
              ))
          : customerListQuery.data?.docs.map((doc) => (
              <CustomerCard key={doc.id} customer={doc.data()} />
            ))}
      </Stack>

      <TablePagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[3, 5, 10]}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Stack>
  );
}
