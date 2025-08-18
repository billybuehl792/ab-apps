import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import { Store } from "@mui/icons-material";
import Metadata from "@/components/lists/Metadata";
import type { Company } from "@/store/types/companies";

const CompanyDetailCard = ({
  company,
  ...props
}: CardProps & { company: Company }) => {
  /** Values */

  const metadata = [
    {
      id: "id",
      label: "ID",
      value: company.id,
    },
  ];

  return (
    <Card {...props}>
      <CardContent
        component={Stack}
        direction="row"
        alignItems="end"
        flexWrap="wrap"
        useFlexGap
      >
        <Avatar
          alt={company.label}
          src={company.thumbnail}
          children={
            company.thumbnail ? undefined : (
              <Store fontSize="large" sx={{ maxWidth: "60%" }} />
            )
          }
          sx={{ width: 120, height: 120 }}
        />
        <Stack p={2} spacing={1} divider={<Divider />} flexGrow={1}>
          <Stack>
            <Typography variant="h5">{company.label}</Typography>
            <Typography variant="body2">{company.description}</Typography>
          </Stack>
          <Metadata items={metadata} variant="caption" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailCard;
