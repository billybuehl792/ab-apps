import {
  type ContextType,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSnackbar } from "notistack";
import { auth } from "@/store/config/firebase";
import AuthContext from "@/context/AuthContext";
import StatusWrapper from "@/components/layout/StatusWrapper";
import {
  AuthMutationKeys,
  DEFAULT_COMPANY,
  DEFAULT_PERMISSIONS,
} from "@/store/constants/auth";
import { authQueries } from "@/store/queries/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [loadingAuth, setLoadingAuth] =
    useState<ContextType<typeof AuthContext>["loading"]>(true);

  /** Values */

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /** Queries */

  const companyQuery = useQuery({
    ...authQueries.company(),
    enabled: !!user,
  });

  const permissionsQuery = useQuery({
    ...authQueries.permissions(),
    enabled: !!user,
  });

  /** Mutations */

  const signOutMutation = useMutation({
    mutationKey: AuthMutationKeys.signOut,
    mutationFn: () => signOut(auth),
    onMutate: () => {
      const tempUser = user;
      setLoadingAuth(true);
      setUser(null);
      return { tempUser };
    },
    onSuccess: () => {
      enqueueSnackbar("Signed out", { variant: "success" });
      queryClient.clear();
    },
    onError: (error, _, context) => {
      enqueueSnackbar(`Error signing out: ${error.message}`, {
        variant: "error",
      });
      setUser(context?.tempUser ?? null);
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
          company: companyQuery.data ?? DEFAULT_COMPANY,
          permissions: permissionsQuery.data ?? DEFAULT_PERMISSIONS,
          loading:
            loadingAuth || permissionsQuery.isLoading || companyQuery.isLoading,
          mutations: { signOut: signOutMutation },
        }),
        [
          user,
          companyQuery.data,
          companyQuery.isLoading,
          permissionsQuery.data,
          permissionsQuery.isLoading,
          loadingAuth,
          signOutMutation,
        ]
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
