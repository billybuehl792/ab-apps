import { createFileRoute } from "@tanstack/react-router";
import { CircularProgress } from "@mui/material";

export const Route = createFileRoute("/posts/$id")({
  component: Post,
  loader: async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { id: params.id };
  },
  pendingComponent: () => <CircularProgress />,
});

function Post() {
  const { id } = Route.useLoaderData();

  return <div>Hello {id}!</div>;
}
