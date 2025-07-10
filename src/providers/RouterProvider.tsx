import { type PropsWithChildren } from "react";
import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";
import router from "@/router";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useClients from "@/hooks/useClients";

const RouterProvider = (props: PropsWithChildren) => {
  /** Values */

  const auth = useAuth();
  const queryClient = useQueryClient();
  const clients = useClients();

  return (
    <TanstackRouterProvider
      router={router}
      context={{ auth, queryClient, clients }}
      {...props}
    />
  );
};

export default RouterProvider;
