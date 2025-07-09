import { RouterProvider } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import router from "./router";
import useAuth from "./hooks/useAuth";
import useClients from "./hooks/useClients";

const App = () => {
  /** Values */

  const auth = useAuth();
  const queryClient = useQueryClient();
  const clients = useClients();

  return (
    <RouterProvider router={router} context={{ auth, queryClient, clients }} />
  );
};

export default App;
