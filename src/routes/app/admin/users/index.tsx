import UserList from "@/containers/lists/UserList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/admin/users/")({
  component: UserList,
});
