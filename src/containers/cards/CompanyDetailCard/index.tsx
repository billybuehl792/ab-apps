import { useQuery } from "@tanstack/react-query";
import { Store } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import useCompanies from "@/hooks/useCompanies";
import type { Company } from "@/store/types/companies";

interface CompanyDetailCardProps extends CardProps {
  company: Company | string;
}

const CompanyDetailCard = ({
  company: companyProp,
  ...props
}: CompanyDetailCardProps) => {
  /** Values */

  const companies = useCompanies();

  const companyId =
    typeof companyProp === "string" ? companyProp : companyProp.id;

  /** Queries */

  const companyQuery = useQuery({
    ...companies.queries.detail(companyId),
    select: (data) => ({ id: data.id, ...data.data() }),
    enabled: typeof companyProp === "string",
  });

  /** Data */

  const company =
    typeof companyProp === "string" ? companyQuery.data : companyProp;
  const alt = company?.label ?? "company";
  const label = company?.label ?? "No Company";
  const thumbnail = company?.thumbnail;
  const description = company?.description;

  return (
    <Card {...props}>
      <CardContent component={Stack} direction="row" alignItems="end">
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
          sx={{ width: 120, height: 120 }}
        />
        <Stack p={2}>
          <Typography variant="h5">{label}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailCard;
