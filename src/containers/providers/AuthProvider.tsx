import {
  type ContextType,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { useSnackbar } from "notistack";
import AuthContext from "@/store/context/AuthContext";
import { auth } from "@/store/config/firebase";
import { authQueries } from "@/store/queries/auth";
import { authMutations } from "@/store/mutations/auth";
import { companyQueries } from "@/store/queries/companies";
import StatusWrapper from "@/components/layout/StatusWrapper";
import { AuthRole } from "@/store/enums/auth";
import { DEFAULT_COMPANY } from "@/store/constants/auth";
import type { Company } from "@/store/types/companies";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [loadingAuth, setLoadingAuth] =
    useState<ContextType<typeof AuthContext>["loading"]>(true);

  /** Values */

  const snackbar = useSnackbar();

  /** Queries */

  const userCustomClaimsQuery = useQuery({
    ...authQueries.customClaims(),
    enabled: Boolean(user),
  });

  const companyId = String(userCustomClaimsQuery.data?.claims.companyId);
  const role = Object.values(AuthRole).includes(
    userCustomClaimsQuery.data?.claims.role as AuthRole
  )
    ? (userCustomClaimsQuery.data?.claims.role as AuthRole)
    : AuthRole.STANDARD;

  const userCompanyQuery = useQuery({
    ...companyQueries.detail(companyId),
    enabled: Boolean(user) && userCustomClaimsQuery.isSuccess,
    retry: false,
    select: (data): Company => ({
      id: data.id,
      ...data.data(),
    }),
  });
  const company = userCompanyQuery.data ?? DEFAULT_COMPANY;

  /** Mutations */

  const signOut = useMutation({
    ...authMutations.signOut(),
    onSuccess: () =>
      snackbar.enqueueSnackbar("Signed out", { variant: "success" }),
    onError: (error) =>
      snackbar.enqueueSnackbar(`Error signing out: ${error.message}`, {
        variant: "error",
      }),
  });

  /** Callbacks */

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        location.reload();
      },
    });
  };
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
          company,
          permissions: { role },
          loading: loadingAuth || userCustomClaimsQuery.isLoading,
          signOut,
        }),
        [
          user,
          company,
          role,
          loadingAuth,
          userCustomClaimsQuery.isLoading,
          signOut,
        ]
      )}
    >
      <StatusWrapper
        component="main"
        loading={
          loadingAuth ||
          userCustomClaimsQuery.isLoading ||
          userCompanyQuery.isLoading
        }
        loadingDescription={
          userCustomClaimsQuery.isLoading
            ? "Loading user information..."
            : userCompanyQuery.isLoading
              ? "Loading company information..."
              : undefined
        }
        error={
          (userCustomClaimsQuery.isError || userCompanyQuery.isError) &&
          "Error loading user information. Contact an admin for support."
        }
        slotProps={{
          errorButton: {
            children: "Sign out",
            onClick: handleSignOut,
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
