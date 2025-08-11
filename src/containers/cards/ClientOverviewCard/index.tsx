import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardActionArea,
  CardContent,
  type CardProps,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import useClients from "@/store/hooks/useClients";

const ClientOverviewCard = (props: CardProps) => {
  /** Values */

  const navigate = useNavigate();
  const clients = useClients();

  /** Queries */

  const clientCountQuery = useQuery(clients.queries.count({ archived: false }));

  /** Callbacks */

  const handleOnClick = () => void navigate({ to: "/app/clients" });

  return (
    <Card {...props}>
      <CardActionArea onClick={handleOnClick}>
        <Stack component={CardContent} spacing={2}>
          <Person fontSize="large" />
          <Stack spacing={1}>
            <Typography variant="body2">Total Clients</Typography>
            {clientCountQuery.isLoading ? (
              <Skeleton variant="text" height={32} width={60} />
            ) : (
              <Typography variant="h5">
                {clientCountQuery.data?.data().count ?? "-"}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default ClientOverviewCard;
