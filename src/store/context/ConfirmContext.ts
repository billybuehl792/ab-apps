import { createContext, type ReactNode } from "react";

export default createContext<{
  confirm: (
    options:
      | {
          title?: ReactNode;
          message: string;
          content?: ReactNode;
          confirmButtonText?: string;
        }
      | string
  ) => Promise<boolean>;
}>({
  confirm: () => Promise.resolve(true),
});
