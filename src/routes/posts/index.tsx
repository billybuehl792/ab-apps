import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  CircularProgress,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";

const posts = [
  { id: "1", label: "hello world" },
  { id: "2", label: "oh cool" },
  { id: "3", label: "test" },
  { id: "4", label: "searching" },
];

export const Route = createFileRoute("/posts/")({
  component: Posts,
  validateSearch: ({ s }: Record<string, unknown>): { s?: string } => ({
    s: s as string,
  }),
  loaderDeps: ({ search: { s } }) => ({ s }),
  loader: async ({ deps: { s = "" } }) => {
    const filteredPosts = posts.filter((post) =>
      post.label.toLowerCase().includes(s.toLowerCase())
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { posts: filteredPosts };
  },
  pendingComponent: () => <CircularProgress />,
});

function Posts() {
  const { posts } = Route.useLoaderData();
  const { s } = Route.useSearch();

  const navigate = useNavigate();

  /** Callbacks */

  const handleSearch: TextFieldProps["onChange"] = (event) =>
    navigate({
      to: "/posts",
      search: { s: event.target.value },
    });

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">Posts</Typography>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={s}
          onChange={handleSearch}
        />
      </Stack>
      {posts.map((post) => (
        <Link key={post.id} to="/posts/$id" params={{ id: post.id }}>
          {post.label}
        </Link>
      ))}
    </Stack>
  );
}
