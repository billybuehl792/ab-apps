import App from "./App";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import Providers from "./providers";

import "reset-css/reset.css";
import "./utils/string";
import "./utils/number";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  );
}
