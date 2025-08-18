import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Skeleton,
  Stack,
  type StackProps,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import useUsers from "@/store/hooks/useUsers";
import UserRecordListCard from "@/containers/cards/UserRecordListCard";
import StatusWrapper from "@/components/layout/StatusWrapper";

const ROWS_PER_PAGE = 10;

const UserList = (props: StackProps) => {
  const [pageTokens, setPageTokens] = useState<string[]>([]);

  /** Values */

  const { queries: userQueries } = useUsers();

  /** Queries */

  const userListQuery = useQuery(
    userQueries.list({
      maxResults: ROWS_PER_PAGE,
      pageToken: pageTokens.at(-1),
    })
  );

  const page = pageTokens.length;
  const currentPageSize = userListQuery.data?.users.length ?? 0;
  const hasPreviousPage = page > 0;
  const hasNextPage = !!userListQuery.data?.pageToken;

  /** Callbacks */

  const handlePageChange: TablePaginationProps["onPageChange"] = (
    _event,
    page
  ) => {
    if (page - 1 < pageTokens.length)
      setPageTokens((current) =>
        current.slice(0, Math.max(current.length - 1, 0))
      );
    else {
      const nextPageToken = userListQuery.data?.pageToken;
      if (nextPageToken)
        setPageTokens((current) => [...current, nextPageToken]);
    }
  };

  return (
    <Stack spacing={1} {...props}>
      <StatusWrapper
        empty={!userListQuery.data?.users.length}
        loading={
          userListQuery.isLoading && (
            <>
              {Array.from({ length: ROWS_PER_PAGE }).map(() => (
                <Skeleton
                  key={crypto.randomUUID()}
                  variant="rounded"
                  height={100}
                />
              ))}
            </>
          )
        }
      >
        {userListQuery.data?.users.map((user) => (
          <UserRecordListCard key={user.uid} user={user} />
        ))}
      </StatusWrapper>
      {(hasPreviousPage || hasNextPage) && (
        <TablePagination
          component="div"
          count={page * ROWS_PER_PAGE + currentPageSize + +hasNextPage}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[]}
          disabled={userListQuery.isLoading}
          labelDisplayedRows={() => null}
          onPageChange={handlePageChange}
        />
      )}
    </Stack>
  );
};

export default UserList;
