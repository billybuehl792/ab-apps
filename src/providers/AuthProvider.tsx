import {
  type ContextType,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/config/firebase";
import AppLoadingState from "@/containers/layout/AppLoadingState";
import AuthContext from "@/context/AuthContext";
import { AuthRole } from "@/types/enums/auth";
import useCompanies from "@/hooks/firebase/useCompanies";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [permissions, setPermissions] =
    useState<ContextType<typeof AuthContext>["permissions"]>(null);
  const [company, setCompany] =
    useState<ContextType<typeof AuthContext>["company"]>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingClaims, setLoadingClaims] = useState(false);

  /** Values */

  const queryClient = useQueryClient();
  const {
    queries: { detail: companyDetail },
  } = useCompanies();

  /** Effects */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchCompany = async (id: string) => {
      try {
        const data = await queryClient.fetchQuery(companyDetail(id));
        return { id: data.id, ...data.data() };
      } catch (error) {
        console.error("Error fetching company:", error);
        return null;
      }
    };

    const fetchClaims = async (user: User) => {
      setLoadingClaims(true);
      try {
        const token = await user.getIdTokenResult();
        setPermissions({
          role:
            token.claims.role === AuthRole.ADMIN
              ? AuthRole.ADMIN
              : AuthRole.BASIC,
        });

        const companyId = token.claims.companyId as string;
        const companyDetail = await fetchCompany(companyId);
        setCompany(companyDetail);
      } catch (error) {
        console.error("Error fetching user claims:", error);
      } finally {
        setLoadingClaims(false);
      }
    };

    if (user) void fetchClaims(user);
    else {
      setPermissions(null);
      setCompany(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext
      value={useMemo(
        () => ({ user, permissions, company }),
        [user, permissions, company]
      )}
    >
      {loadingAuth || loadingClaims ? (
        <AppLoadingState
          description={loadingClaims && "Loading permissions..."}
        />
      ) : (
        children
      )}
    </AuthContext>
  );
};

export default AuthProvider;
