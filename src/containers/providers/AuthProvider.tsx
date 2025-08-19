import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";
import { useSnackbar } from "notistack";
import AuthContext from "@/store/context/AuthContext";
import { auth } from "@/store/config/firebase";
import { authMutations } from "@/store/mutations/auth";
import { companyQueries } from "@/store/queries/companies";
import StatusWrapper from "@/components/layout/StatusWrapper";
import { authUtils } from "@/store/utils/auth";
import type { Company } from "@/store/types/companies";
import type { Permissions, Profile } from "@/store/types/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>({
    company: null,
    permissions: null,
  });
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  /** Values */

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  /** Mutations */

  const reloadUser = useMutation({
    ...authMutations.reloadUser(),
    onSuccess: () => {
      setUser(auth.currentUser);
    },
    onError: (error) =>
      snackbar.enqueueSnackbar(`Error reloading user: ${error.message}`, {
        variant: "error",
      }),
  });

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

  const handleFetchCompany = async (companyId: string | null) => {
    try {
      if (!companyId) throw new Error("No company ID provided");
      const data = await queryClient.fetchQuery(
        companyQueries.detail(companyId)
      );
      return { id: data.id, ...data.data() } as Company;
    } catch (_error) {
      snackbar.enqueueSnackbar("Error retrieving user's company", {
        variant: "error",
      });
      return null;
    }
  };

  const handleFetchProfile = async (user: User) => {
    let permissions: Permissions | null = null;
    let company: Company | null = null;

    setLoading(true);
    setLoadingProfile(true);
    try {
      const idTokenResult = await user.getIdTokenResult();
      permissions = authUtils.getPermissionsFromCustomClaims(
        idTokenResult.claims
      );
      const companyId = authUtils.getCompanyIdFromCustomClaims(
        idTokenResult.claims
      );
      company = await handleFetchCompany(companyId);
    } catch (_error) {
      snackbar.enqueueSnackbar("Error retrieving user data", {
        variant: "error",
      });
    } finally {
      setLoading(false);
      setLoadingProfile(false);
      setProfile({ company, permissions });
    }
  };

  /** Effects */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) void handleFetchProfile(user);
      else {
        setLoading(false);
        setProfile({ company: null, permissions: null });
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext
      value={useMemo(
        () => ({
          user,
          profile,
          loading,
          signOut,
          reloadUser,
        }),
        [user, profile, loading, signOut, reloadUser]
      )}
    >
      <StatusWrapper
        component="main"
        loading={loading}
        {...(loadingProfile && { loadingDescription: "Loading profile..." })}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          color: (theme) => theme.palette.primary.contrastText,
          bgcolor: (theme) => theme.palette.primary.main,
        }}
      >
        {children}
      </StatusWrapper>
    </AuthContext>
  );
};

export default AuthProvider;
