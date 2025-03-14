import { createFileRoute } from "@tanstack/react-router";
import { CircularProgress } from "@mui/material";

export const Route = createFileRoute("/posts/$postId")({
  component: Post,
  loader: async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { postId: params.postId };
  },
  pendingComponent: () => <CircularProgress />,
});

function Post() {
  const { postId } = Route.useLoaderData();

  return <div>Hello {postId}!</div>;
}
