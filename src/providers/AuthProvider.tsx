import {
  type ContextType,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSnackbar } from "notistack";
import { auth } from "@/store/config/firebase";
import useUsers from "@/hooks/useUsers";
import AuthContext from "@/context/AuthContext";
import StatusWrapper from "@/components/layout/StatusWrapper";
import { AuthMutationKeys } from "@/store/constants/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  /** Values */

  const { enqueueSnackbar } = useSnackbar();
  const { queries: userQueries } = useUsers();

  /** Queries */

  const permissionsQuery = useQuery({
    ...userQueries.permissions(user?.uid ?? ""),
    enabled: !!user,
  });
  const companyQuery = useQuery({
    ...userQueries.company(user?.uid ?? ""),
    enabled: !!user,
  });

  /** Mutations */

  const signOutMutation = useMutation({
    mutationKey: AuthMutationKeys.signOut,
    mutationFn: () => signOut(auth),
    onMutate: () => {
      setLoadingAuth(true);
    },
    onSuccess: () => enqueueSnackbar("Signed out", { variant: "success" }),
    onError: (error) =>
      enqueueSnackbar(`Error signing out: ${error.message}`, {
        variant: "error",
      }),
    onSettled: () => {
      setLoadingAuth(false);
    },
  });

  /** Effects */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext
      value={useMemo(
        () => ({
          user,
          company: companyQuery.data,
          permissions: permissionsQuery.data,
          mutations: { signOut: signOutMutation },
        }),
        [user, companyQuery.data, permissionsQuery.data, signOutMutation]
      )}
    >
      <StatusWrapper
        component="main"
        loading={
          loadingAuth || permissionsQuery.isLoading || companyQuery.isLoading
        }
        loadingDescription={
          permissionsQuery.isLoading
            ? "Loading permissions..."
            : companyQuery.isLoading
              ? "Loading company..."
              : null
        }
        error={permissionsQuery.error || companyQuery.error}
        slotProps={{
          errorButton: {
            children: "Sign Out",
            loading: signOutMutation.isPending,
            onClick: () => {
              signOutMutation.mutate();
            },
          },
        }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          color: "primary.contrastText",
          bgcolor: "primary.main",
        }}
      >
        {children}
      </StatusWrapper>
    </AuthContext>
  );
};

export default AuthProvider;
