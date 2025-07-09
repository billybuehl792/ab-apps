import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Chip,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  type ChipProps,
} from "@mui/material";
import { Store } from "@mui/icons-material";
import useUsers from "@/hooks/useUsers";
import { type User } from "firebase/auth";

const UserCompanyChip = ({ user, ...props }: ChipProps & { user: User }) => {
  /** Values */

  const {
    queries: { company },
  } = useUsers();

  /** Queries */

  const companyQuery = useQuery(company(user.uid));

  const alt = companyQuery.data?.label ?? "company";
  const label = companyQuery.data?.label ?? "-";
  const thumbnail = companyQuery.data?.thumbnail;
  const description = companyQuery.data?.description;

  /** Components */

  const AvatarComponent = (
    <Avatar
      alt={alt}
      src={thumbnail}
      children={
        companyQuery.isLoading ? (
          <Skeleton variant="circular" />
        ) : thumbnail ? undefined : (
          <Store sx={{ maxWidth: "60%", color: "white" }} />
        )
      }
      sx={{ bgcolor: "primary.main", width: 24, height: 24 }}
    />
  );

  return (
    <Tooltip
      title={
        <Stack component="span" direction="row" spacing={1}>
          {AvatarComponent}
          <Stack component="span" spacing={0.5}>
            <Typography variant="body2" fontWeight={600}>
              {label}
            </Typography>
            {description && (
              <Typography variant="body2" fontWeight={300} color="white">
                {description}
              </Typography>
            )}
          </Stack>
        </Stack>
      }
    >
      <Chip
        label={
          companyQuery.isLoading ? (
            <Skeleton variant="text" width={100} />
          ) : (
            label
          )
        }
        avatar={AvatarComponent}
        size="small"
        color="default"
        variant="outlined"
        {...props}
      />
    </Tooltip>
  );
};

export default UserCompanyChip;
