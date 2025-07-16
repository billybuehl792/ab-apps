import { useNavigate } from "@tanstack/react-router";
import { type UserRecord } from "firebase-admin/auth";
import {
  Avatar,
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";
import CompanyChip from "@/containers/chips/CompanyChip";
import UserEmailChip from "@/containers/chips/UserEmailChip";

interface UserRecordCardProps extends CardProps {
  user: UserRecord;
}

const UserRecordCard = ({ user, ...props }: UserRecordCardProps) => {
  /** Values */

  const navigate = useNavigate();

  const companyId = String(user.customClaims?.companyId ?? "");

  /** Callbacks */

  const handleOnClick: CardActionAreaProps["onClick"] = () =>
    void navigate({ to: `/app/admin/users/${user.uid}` });

  return (
    <Card {...props}>
      <CardActionArea onClick={handleOnClick}>
        <CardContent
          component={Stack}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar src={user.photoURL} alt={user.displayName} />
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" noWrap>
                {user.displayName}
              </Typography>
              <UserEmailChip user={user} />
            </Stack>
            <Stack direction="row">
              <CompanyChip company={companyId} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserRecordCard;
