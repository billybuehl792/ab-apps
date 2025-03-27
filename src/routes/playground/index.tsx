import MaterialCard from "@/containers/cards/MaterialCard";
import { Dialog, DialogContent, Stack } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Stack spacing={1}>
        <MaterialCard
          material={{
            id: "example-id",
            label: "Example Label",
            value: 10,
            description: "Example Description",
          }}
          options={[
            { id: "delete", label: "Delete", onClick: () => alert("delete") },
            { id: "edit", label: "Edit", onClick: () => navigate({ to: "/" }) },
          ]}
        />
      </Stack>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogContent>Modal Here</DialogContent>
      </Dialog>
    </>
  );
}
