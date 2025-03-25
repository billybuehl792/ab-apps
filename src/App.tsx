import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./context/AuthContext";
import { router } from "./router";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

export default App;
