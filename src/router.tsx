import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  context: {
    auth: { user: null },
    queryClient: null!,
  },
});
