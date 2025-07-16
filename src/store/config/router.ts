import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";
import useClients from "@/hooks/useClients";
import useUsers from "@/hooks/useUsers";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    auth: {} as ReturnType<typeof useAuth>,
    clients: {} as ReturnType<typeof useClients>,
    users: {} as ReturnType<typeof useUsers>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryClient: null!,
  },
  defaultNotFoundComponent: () => "Page not found :(",
});

export default router;
