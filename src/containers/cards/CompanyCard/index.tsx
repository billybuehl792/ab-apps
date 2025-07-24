import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import { Store } from "@mui/icons-material";
import useCompanies from "@/hooks/useCompanies";
import type { Company } from "@/store/types/companies";
import { useNavigate } from "@tanstack/react-router";

interface CompanyCardProps extends CardProps {
  company: Company | string;
}
const CompanyCard = ({ company: companyProp, ...props }: CompanyCardProps) => {
  /** Values */

  const navigate = useNavigate();
  const companies = useCompanies();
  const companyId =
    typeof companyProp === "string" ? companyProp : companyProp.id;

  /** Queries */

  const companyQuery = useQuery({
    ...companies.queries.detail(companyId),
    select: (data) => ({ id: data.id, ...data.data() }),
  });
  const company =
    typeof companyProp === "string" ? companyQuery.data : companyProp;

  if (companyQuery.isLoading)
    return <Skeleton variant="rectangular" height={56} />;

  /** Callbacks */

  const handleOnClick = () =>
    void navigate({ to: `/app/admin/companies/${companyId}` });

  return (
    <Card {...props}>
      <CardActionArea onClick={handleOnClick}>
        <CardContent
          component={Stack}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar
            alt={company?.label ?? "company"}
            src={company?.thumbnail}
            children={
              company?.thumbnail ? undefined : (
                <Store sx={{ maxWidth: "60%" }} />
              )
            }
            sx={{ width: 24, height: 24 }}
          />
          <Typography variant="body2" noWrap>
            {company?.label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CompanyCard;
