import { useNavigate } from "@tanstack/react-router";
import { type User } from "firebase/auth";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import UserDetailCardPhotoUrlIconButton from "@/containers/cards/UserDetailCard/buttons/UserDetailCardPhotoUrlIconButton";
import UserDetailCardDisplayName from "./layout/UserDetailCardDisplayName";
import UserDetailCardEmail from "./layout/UserDetailCardEmail";
import UserDetailCardLastSignIn from "./layout/UserDetailCardLastSignIn";
import UserDetailCardMemberSince from "./layout/UserDetailCardMemberSince";
import UserDetailCardPermissions from "./layout/UserDetailCardPermissions";
import UserCompanyChip from "@/containers/chips/UserCompanyChip";

interface UserDetailCardProps extends CardProps {
  user: User;
}

const UserDetailCard = ({ user, ...props }: UserDetailCardProps) => {
  /** Values */

  const {
    mutations: { signOut },
  } = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      id: "company",
      label: "Company",
      value: <UserCompanyChip user={user} />,
    },
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

  /** Callbacks */

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => void navigate({ to: "/sign-in" }),
    });
  };

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
          <UserDetailCardPermissions user={user} />
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
      <CardActions sx={{ justifyContent: "end" }}>
        <Button
          variant="text"
          size="small"
          startIcon={<Logout />}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserDetailCard;
