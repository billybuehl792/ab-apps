import { createFileRoute } from "@tanstack/react-router";
import { Skeleton, Stack, Typography } from "@mui/material";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/firebase";

export const Route = createFileRoute("/about/")({
  component: About,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async () => {
    const colRef = collection(db, "clients");
    const clients = await getDocs(query(colRef, limit(10)));

    return { clients };
  },
  pendingComponent: () => <Skeleton />,
  errorComponent: ({ error }) => <Stack>{error.message}</Stack>,
});

function About() {
  const { clients } = Route.useLoaderData();

  return (
    <Stack spacing={2}>
      <Typography variant="body2">This should render clients</Typography>
      {clients.docs.map((doc) => (
        <Typography key={doc.id}>{doc.data().first_name}</Typography>
      ))}
    </Stack>
  );
}
