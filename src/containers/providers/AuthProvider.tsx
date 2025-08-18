import {
  type ContextType,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import type { Permissions } from "@/store/types/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [profile, setProfile] = useState<
    ContextType<typeof AuthContext>["profile"]
  >({ company: null, permissions: null });
  const [loading, setLoading] =
    useState<ContextType<typeof AuthContext>["loading"]>(true);

  /** Values */

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

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
        }),
        [user, profile, loading, signOut]
      )}
    >
      <StatusWrapper
        component="main"
        loading={loading}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          color: (theme) => theme.palette.primary.contrastText,
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {children}
      </StatusWrapper>
    </AuthContext>
  );
};

export default AuthProvider;
