import { type PropsWithChildren } from "react";
import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";
import router from "@/store/config/router";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useClients from "@/hooks/useClients";
import useUsers from "@/hooks/useUsers";

const RouterProvider = (props: PropsWithChildren) => {
  /** Values */

  const queryClient = useQueryClient();
  const auth = useAuth();
  const clients = useClients();
  const users = useUsers();

  return (
    <TanstackRouterProvider
      router={router}
      context={{ queryClient, auth, clients, users }}
      {...props}
    />
  );
};

export default RouterProvider;
