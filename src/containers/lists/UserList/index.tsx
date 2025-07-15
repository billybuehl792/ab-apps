import { useQuery } from "@tanstack/react-query";
import { Skeleton, Stack } from "@mui/material";
import useUsers from "@/hooks/useUsers";
import UserRecordCard from "@/containers/cards/UserRecordCard";
import StatusWrapper from "@/components/layout/StatusWrapper";

const UserList = () => {
  /** Values */

  const { queries: userQueries } = useUsers();

  /** Queries */

  const userListQuery = useQuery(userQueries.list());

  return (
    <Stack spacing={1}>
      <StatusWrapper
        loading={
          userListQuery.isLoading && (
            <>
              {Array.from({ length: 5 }).map(() => (
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
          <UserRecordCard key={user.uid} user={user} />
        ))}
      </StatusWrapper>
    </Stack>
  );
};

export default UserList;
