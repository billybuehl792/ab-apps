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
  validateSearch: (search: Record<string, unknown>): { term?: string } => ({
    term: search.term as string,
  }),
  loaderDeps: ({ search: { term } }) => ({ term }),
  loader: async ({ deps: { term = "" } }) => {
    const filteredPosts = posts.filter((post) =>
      post.label.toLowerCase().includes(term.toLowerCase())
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { posts: filteredPosts };
  },
  pendingComponent: () => <CircularProgress />,
});

function Posts() {
  const { posts } = Route.useLoaderData();
  const { term } = Route.useSearch();

  const navigate = useNavigate();

  /** Callbacks */

  const handleSearch: TextFieldProps["onChange"] = (event) =>
    navigate({
      to: "/posts",
      search: { term: event.target.value },
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
          value={term}
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
