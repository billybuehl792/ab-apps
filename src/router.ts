import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import useClients from "./hooks/firebase/useClients";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    auth: { user: null, permissions: null, company: null },
    clients: {} as ReturnType<typeof useClients>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryClient: null!,
  },
  defaultNotFoundComponent: () => "Page not found :(",
});

export default router;
