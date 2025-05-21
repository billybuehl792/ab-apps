import { type User } from "firebase/auth";
import dayjs from "dayjs";
import { Tooltip, Typography, type TypographyProps } from "@mui/material";
import { DateFormat, DateTimeFormat } from "@/types/enums/datetime";

interface UserDetailCardMemberSinceProps extends TypographyProps {
  user: User;
}

const UserDetailCardMemberSince = ({
  user,
  ...props
}: UserDetailCardMemberSinceProps) => {
  return (
    <Tooltip
      title={dayjs(user.metadata.creationTime).format(
        DateTimeFormat.DATETIME_MERIDIEM
      )}
    >
      <Typography variant="body2" fontWeight={300} color="white" {...props}>
        {`Member since ${dayjs(user.metadata.creationTime).format(DateFormat.DATE)}`}
      </Typography>
    </Tooltip>
  );
};

export default UserDetailCardMemberSince;
