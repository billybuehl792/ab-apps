import { StrictMode } from "react";
import router from "./router";
import App from "./App";

import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";

import Providers from "./providers";

import "reset-css/reset.css";
import "./utils/string";
import "./utils/number";
import "./utils/dayjs";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN as string,
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement, {
    // Callback called when an error is thrown and not caught by an Error Boundary.
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn("Uncaught error", error, errorInfo.componentStack);
    }),
    // Callback called when React catches an error in an Error Boundary.
    onCaughtError: Sentry.reactErrorHandler(),
    // Callback called when React automatically recovers from errors.
    onRecoverableError: Sentry.reactErrorHandler(),
  });
  root.render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  );
}
