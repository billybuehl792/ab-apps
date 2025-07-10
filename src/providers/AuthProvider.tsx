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
import AppLoadingState from "@/containers/layout/AppLoadingState";
import AuthContext from "@/context/AuthContext";
import { AuthMutationKeys } from "@/store/constants/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  /** Values */

  const { enqueueSnackbar } = useSnackbar();
  const {
    queries: { company, permissions },
  } = useUsers();

  /** Queries */

  const permissionsQuery = useQuery({
    ...permissions(user?.uid ?? ""),
    enabled: !!user,
  });
  const companyQuery = useQuery({
    ...company(user?.uid ?? ""),
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
      {loadingAuth || permissionsQuery.isLoading || companyQuery.isLoading ? (
        <AppLoadingState
          description={
            loadingAuth
              ? undefined
              : permissionsQuery.isLoading
                ? "Loading permissions..."
                : "Loading company..."
          }
        />
      ) : (
        children
      )}
    </AuthContext>
  );
};

export default AuthProvider;
