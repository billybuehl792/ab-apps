import { materialCollection } from "@/firebase/collections";
import { Stack, TextField, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { getDocs } from "firebase/firestore";

export const Route = createFileRoute("/calculator/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw new Error("User not authenticated");
  },
  loader: async () => {
    const materials = await getDocs(materialCollection);
    return { materials };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
  /** Values */

  const { materials } = Route.useLoaderData();

  return (
    <Stack>
      {materials.docs.map((material) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(material.data().value)}
          </Typography>
          <TextField
            key={material.id}
            label={material.data().label}
            type="number"
          />
        </Stack>
      ))}
    </Stack>
  );
}
