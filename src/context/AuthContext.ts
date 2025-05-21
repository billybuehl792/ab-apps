import { createContext } from "react";
import type { AuthContextValue } from "@/types/auth";

export default createContext<AuthContextValue>({
  user: null,
  loading: true,
});
