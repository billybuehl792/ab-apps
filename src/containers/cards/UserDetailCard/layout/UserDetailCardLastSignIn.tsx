import { type User } from "firebase/auth";
import dayjs from "dayjs";
import { Tooltip, Typography, type TypographyProps } from "@mui/material";
import { DateTimeFormat } from "@/store/enums/datetime";

interface UserDetailCardLastSignInProps extends TypographyProps {
  user: User;
}

const UserDetailCardLastSignIn = ({
  user,
  ...props
}: UserDetailCardLastSignInProps) => {
  return (
    <Tooltip
      title={dayjs(user.metadata.lastSignInTime).format(
        DateTimeFormat.DATETIME_MERIDIEM
      )}
    >
      <Typography variant="body2" fontWeight={600} {...props}>
        {dayjs(user.metadata.lastSignInTime).fromNow()}
      </Typography>
    </Tooltip>
  );
};

export default UserDetailCardLastSignIn;
