import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    auth: {
      user: null,
      loading: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryClient: null!,
  },
  defaultNotFoundComponent: () => "Page not found :(",
});

export default router;
