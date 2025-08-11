import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type QueryDocumentSnapshot } from "firebase/firestore";
import {
  Skeleton,
  Stack,
  type StackProps,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { Store } from "@mui/icons-material";
import useCompanies from "@/store/hooks/useCompanies";
import StatusWrapper from "@/components/layout/StatusWrapper";
import CompanyListCard from "@/containers/cards/CompanyListCard";

const ROWS_PER_PAGE = 10;

const CompanyList = (props: StackProps) => {
  const [lastDocs, setLastDocs] = useState<QueryDocumentSnapshot[]>([]);

  /** Values */

  const companies = useCompanies();

  /** Queries */

  const countQuery = useQuery(companies.queries.count({ archived: false }));
  const listQuery = useQuery({
    ...companies.queries.list({
      archived: false,
      limit: ROWS_PER_PAGE,
      startAfter: lastDocs[lastDocs.length - 1],
    }),
    enabled: Boolean(countQuery.isSuccess),
  });

  /** Callbacks */

  const handlePageChange: TablePaginationProps["onPageChange"] = (
    _event,
    page
  ) => {
    if (page < lastDocs.length)
      setLastDocs((current) =>
        current.slice(0, Math.max(current.length - 1, 0))
      );
    else {
      const currentLastDoc = listQuery.data?.docs[listQuery.data.size - 1];
      if (!currentLastDoc) return;
      setLastDocs((current) => [...current, currentLastDoc]);
    }
  };

  return (
    <Stack spacing={1} {...props}>
      <StatusWrapper
        error={countQuery.error || listQuery.error}
        empty={
          countQuery.isSuccess &&
          countQuery.data.data().count === 0 && {
            text: "No Clients",
            icon: <Store fontSize="large" color="disabled" />,
          }
        }
        loading={
          (countQuery.isLoading || listQuery.isLoading) && (
            <>
              {Array.from({ length: ROWS_PER_PAGE }).map(() => (
                <Skeleton
                  key={crypto.randomUUID()}
                  variant="rounded"
                  height={80}
                />
              ))}
            </>
          )
        }
      >
        {listQuery.data?.docs.map((doc) => (
          <CompanyListCard
            key={doc.id}
            company={{ id: doc.id, ...doc.data() }}
          />
        ))}
        {countQuery.isSuccess &&
          countQuery.data.data().count > ROWS_PER_PAGE && (
            <TablePagination
              component="div"
              count={countQuery.data.data().count}
              page={lastDocs.length}
              rowsPerPage={ROWS_PER_PAGE}
              rowsPerPageOptions={[]}
              disabled={listQuery.isLoading}
              labelDisplayedRows={({ from, to, count }) =>
                `${String(from)} - ${String(to)} of ${String(count)}`
              }
              onPageChange={handlePageChange}
            />
          )}
      </StatusWrapper>
    </Stack>
  );
};

export default CompanyList;
