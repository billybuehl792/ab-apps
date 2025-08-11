import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import { Store } from "@mui/icons-material";
import type { Company } from "@/store/types/companies";

const CompanyDetailCard = ({
  company,
  ...props
}: CardProps & { company: Company }) => {
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
        <Stack p={2}>
          <Typography variant="h5">{company.label}</Typography>
          <Typography variant="body2">{company.description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailCard;
