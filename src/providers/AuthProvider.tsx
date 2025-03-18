import {
  type ContextType,
  type FC,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<ContextType<typeof AuthContext>>({
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setValue({ user });
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
