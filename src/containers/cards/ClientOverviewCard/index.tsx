import { Link } from "@tanstack/react-router";
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
import React from "react";
import { sxAsArray } from "@/store/utils/sx";

interface IClientOverviewCardProps extends CardProps {
  disabled?: boolean;
}

const ClientOverviewCard: React.FC<IClientOverviewCardProps> = ({
  disabled,
  ...props
}) => {
  /** Values */

  const clients = useClients();

  /** Queries */

  const clientCountQuery = useQuery(
    clients.queries.count({
      filters: [{ field: "archived", operator: "==", value: false }],
    }),
  );

  return (
    <Card
      {...props}
      sx={[disabled ? { color: "text.disabled" } : {}, ...sxAsArray(props?.sx)]}
    >
      <CardActionArea
        LinkComponent={Link}
        href="/app/clients"
        disabled={disabled}
      >
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
