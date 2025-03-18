import { createContext, useContext } from "react";
import type { User } from "firebase/auth";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthContext, useAuth };
