import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import useClients from "../../hooks/useClients";
import { ContextType } from "react";
import AuthContext from "../../context/AuthContext";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    auth: {
      user: null,
      mutations: {} as ContextType<typeof AuthContext>["mutations"],
    },
    clients: {} as ReturnType<typeof useClients>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryClient: null!,
  },
  defaultNotFoundComponent: () => "Page not found :(",
});

export default router;
