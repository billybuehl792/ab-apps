import {
  type ContextType,
  type FC,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signOut as _signOut } from "firebase/auth";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { firebaseUtils } from "@/firebase/utils";
import { delay } from "@/utils/queries";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] =
    useState<ContextType<typeof AuthContext>["user"]>(null);
  const [loading, setLoading] = useState(true);

  /** Values */

  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const signIn = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (credentials: { email: string; password: string }) => {
      await delay(500);
      return await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
    },
    onSuccess: ({ user }) => {
      enqueueSnackbar(`${user.displayName ?? user.email ?? "User"} signed in`, {
        variant: "success",
      });
    },
    onError: (error) =>
      enqueueSnackbar(firebaseUtils.getErrorMessage(error), {
        variant: "error",
      }),
  });

  const signOut = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => _signOut(auth),
    onSuccess: () => {
      enqueueSnackbar("Signed out", { variant: "success" });
    },
    onError: (error) =>
      enqueueSnackbar(firebaseUtils.getErrorMessage(error), {
        variant: "error",
      }),
  });

  /** Effects */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
