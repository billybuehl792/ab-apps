import { type User } from "firebase/auth";
import {
  Card,
  CardContent,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";

import UserDetailCardPhotoUrlIconButton from "@/containers/cards/UserDetailCard/buttons/UserDetailCardPhotoUrlIconButton";
import UserDetailCardDisplayName from "./layout/UserDetailCardDisplayName";
import UserDetailCardEmail from "./layout/UserDetailCardEmail";
import UserDetailCardLastSignIn from "./layout/UserDetailCardLastSignIn";
import UserDetailCardMemberSince from "./layout/UserDetailCardMemberSince";

interface UserDetailCardProps extends CardProps {
  user: User;
}

const UserDetailCard = ({ user, ...props }: UserDetailCardProps) => {
  /** Values */

  const items = [
    {
      id: "email",
      label: "Email",
      value: <UserDetailCardEmail user={user} />,
    },
    {
      id: "phone",
      render: Boolean(user.phoneNumber),
      label: "Phone",
      value: user.phoneNumber?.toPhone(),
    },
    {
      id: "lastLogin",
      label: "Last Sign In",
      value: <UserDetailCardLastSignIn user={user} />,
    },
  ];

  return (
    <Card {...props}>
      <CardContent
        component={Stack}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        minHeight={160}
        bgcolor={({ palette }) => palette.primary.main}
      >
        <UserDetailCardPhotoUrlIconButton user={user} />
        <Stack spacing={0.5} alignItems="center">
          <UserDetailCardDisplayName user={user} />
          <UserDetailCardMemberSince user={user} />
        </Stack>
      </CardContent>
      <CardContent component={Stack} direction="row" spacing={2}>
        <Stack spacing={1}>
          {items
            .filter((item) => item.render !== false)
            .map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Typography variant="body2">{item.label}:</Typography>
                {typeof item.value === "string" ? (
                  <Typography variant="body2" fontWeight={600}>
                    {item.value}
                  </Typography>
                ) : (
                  item.value
                )}
              </Stack>
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserDetailCard;
