import {
  type ContextType,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { useSnackbar } from "notistack";
import { auth, functions } from "@/store/config/firebase";
import AuthContext from "@/context/AuthContext";
import StatusWrapper from "@/components/layout/StatusWrapper";
import { AuthMutationKeys } from "@/store/constants/auth";
import type { Company } from "@/store/types/companies";
import type { Permissions } from "@/store/types/auth";

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
    queryKey: ["company"],
    queryFn: async () => {
      const res = await httpsCallable<unknown, Company>(
        functions,
        "auth-getCompany"
      )();

      return res.data;
    },
  });

  const permissionsQuery = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const res = await httpsCallable<unknown, Permissions>(
        functions,
        "auth-getPermissions"
      )();

      return res.data;
    },
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
          company: companyQuery.data,
          permissions: permissionsQuery.data,
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
