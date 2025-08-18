import { Link } from "@tanstack/react-router";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import { Store } from "@mui/icons-material";
import type { Company } from "@/store/types/companies";

const AVATAR_HEIGHT = 32;

const CompanyListCard = ({
  company,
  ...props
}: CardProps & { company: Company }) => {
  return (
    <Card {...props}>
      <CardActionArea
        LinkComponent={Link}
        href={`/app/admin/companies/${company.id}`}
      >
        <CardContent
          component={Stack}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar
            alt={company.label}
            src={company.thumbnail}
            children={
              company.thumbnail ? undefined : <Store sx={{ maxWidth: "60%" }} />
            }
            sx={{ width: AVATAR_HEIGHT, height: AVATAR_HEIGHT }}
          />
          <Stack>
            <Typography variant="body2" noWrap>
              {company.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {company.description}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CompanyListCard;
