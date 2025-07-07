import { Avatar, Chip, Stack, Tooltip, Typography } from "@mui/material";
import type { Company } from "@/types/auth";

const UserDetailCardCompany = ({ company }: { company: Company | null }) => {
  return (
    <Tooltip
      title={
        <Stack direction="row" spacing={1}>
          <Avatar
            alt={company?.label ?? "company"}
            src={company?.thumbnail ?? ""}
          />
          <Stack component="span" spacing={0.5}>
            <Typography variant="body2" fontWeight={600}>
              {company?.label ?? "No Company"}
            </Typography>
            <Typography variant="body2" fontWeight={300} color="white">
              {company?.description}
            </Typography>
          </Stack>
        </Stack>
      }
    >
      <Chip
        label={company?.label ?? "-"}
        variant="outlined"
        size="small"
        avatar={
          <Avatar
            alt={company?.label ?? "company"}
            src={company?.thumbnail ?? ""}
          />
        }
      />
    </Tooltip>
  );
};

export default UserDetailCardCompany;
