import type { User } from "firebase/auth";

export type UserFormValues = Pick<User, "displayName" | "photoURL">;
