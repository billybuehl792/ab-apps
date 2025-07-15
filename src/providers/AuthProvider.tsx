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
import { AuthMutationKeys } from "@/store/constants/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [loadingAuth, setLoadingAuth] =
    useState<ContextType<typeof AuthContext>["loading"]>(true);

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
      const tempUser = user;
      setLoadingAuth(true);
      setUser(null);
      return { user: tempUser };
    },
    onSuccess: () => enqueueSnackbar("Signed out", { variant: "success" }),
    onError: (error, _, context) => {
      setUser(context?.user ?? null);
      setLoadingAuth(false);
      enqueueSnackbar(`Error signing out: ${error.message}`, {
        variant: "error",
      });
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
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
