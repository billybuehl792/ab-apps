import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./context/AuthContext";
import { router } from "./router";

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
