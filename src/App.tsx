import { RouterProvider } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { router } from "./main";
import useAuth from "./hooks/auth/useAuth";

const App = () => {
  /** Values */

  const auth = useAuth();
  const queryClient = useQueryClient();

  return <RouterProvider router={router} context={{ auth, queryClient }} />;
};

export default App;
