import CompanyChip from "@/containers/chips/CompanyChip";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  CardProps,
  Stack,
  Typography,
} from "@mui/material";
import { type UserRecord } from "firebase-admin/auth";

interface UserRecordCardProps extends CardProps {
  user: UserRecord;
}

const UserRecordCard = ({ user, ...props }: UserRecordCardProps) => {
  /** Values */

  const companyId = String(user.customClaims?.companyId ?? "");

  /** Callbacks */

  const handleOnClick: CardActionAreaProps["onClick"] = (event) => {
    console.log("User clicked:", user.uid, event);
  };

  return (
    <Card {...props}>
      <CardActionArea onClick={handleOnClick}>
        <CardContent
          component={Stack}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Avatar src={user.photoURL} alt={user.displayName} />
          <Stack spacing={1}>
            <Stack>
              <Typography variant="body1" noWrap>
                {user.displayName}
              </Typography>
              <Typography variant="caption" noWrap>
                {user.email}
              </Typography>
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
