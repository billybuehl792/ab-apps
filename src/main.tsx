import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
}
