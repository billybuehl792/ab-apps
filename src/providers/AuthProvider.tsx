import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { type User } from "firebase/auth";

import AppLoadingState from "@/containers/layout/AppLoadingState";
import AuthContext from "@/context/AuthContext";
import { auth } from "@/config/firebase";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /** Effects */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext value={useMemo(() => ({ user, loading }), [user, loading])}>
      {loading ? <AppLoadingState /> : children}
    </AuthContext>
  );
};

export default AuthProvider;
