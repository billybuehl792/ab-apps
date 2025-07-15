import { type ComponentProps } from "react";
import { useRouter } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";
import StatusWrapper from "@/components/layout/StatusWrapper";

const AppStatusWrapper = (props: ComponentProps<typeof StatusWrapper>) => {
  /** Values */

  const router = useRouter();
  const {
    loading,
    company,
    permissions,
    mutations: { signOut },
  } = useAuth();

  /** Callbacks */

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => void router.invalidate(),
    });
  };

  return (
    <StatusWrapper
      component="main"
      loading={loading}
      error={
        !company
          ? "No company found"
          : !permissions
            ? "No permissions found"
            : undefined
      }
      slotProps={{
        errorButton: {
          children: "Sign Out",
          loading: signOut.isPending,
          onClick: handleSignOut,
        },
      }}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        color: ({ palette }) => palette.primary.contrastText,
        bgcolor: ({ palette }) => palette.primary.main,
      }}
      {...props}
    />
  );
};

export default AppStatusWrapper;
