import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/global";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser({ id: "1", name: "Hello User" });
      setLoading(false);
    }, 2000);

    return () => {
      setUser(null);
      setLoading(true);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
