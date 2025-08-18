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
import useCompanies from "@/store/hooks/useCompanies";
import type { Company } from "@/store/types/companies";

const CompanyChip = ({
  company: companyProp,
  ...props
}: ChipProps & { company: Company | string }) => {
  /** Values */

  const { queries: companyQueries } = useCompanies();
  const companyId =
    typeof companyProp === "string" ? companyProp : companyProp.id;

  /** Queries */

  const companyQuery = useQuery({
    ...companyQueries.detail(companyId),
    select: (data) => ({ id: data.id, ...data.data() }),
    enabled: typeof companyProp === "string" && !!companyId,
  });

  const company =
    typeof companyProp === "string" ? companyQuery.data : companyProp;
  const alt = company?.label ?? "company";
  const label = company?.label ?? "No Company";
  const thumbnail = company?.thumbnail;
  const description = company?.description;

  /** Components */

  const AvatarComponent = (
    <Avatar
      alt={alt}
      src={thumbnail}
      children={
        companyQuery.isLoading ? (
          <Skeleton variant="circular" />
        ) : thumbnail ? undefined : (
          <Store sx={{ maxWidth: "60%" }} />
        )
      }
      sx={{ width: 24, height: 24 }}
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
        sx={{ opacity: companyId ? 1 : 0.5 }}
        {...props}
      />
    </Tooltip>
  );
};

export default CompanyChip;
