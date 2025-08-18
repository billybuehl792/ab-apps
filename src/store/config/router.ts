import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import useAuth from "../hooks/useAuth";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    auth: {} as ReturnType<typeof useAuth>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryClient: null!,
  },
  defaultNotFoundComponent: () => "Page not found :(",
});

export default router;
