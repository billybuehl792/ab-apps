import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, type ButtonProps, Stack, TextField } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { signIn, signOut } from "@/firebase/auth";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /** Values */

  const auth = useAuth();
  const navigate = useNavigate();

  /** Callbacks */

  const handleSignIn: ButtonProps["onClick"] = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await signIn(email, password);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Error signing in", error);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  const handleSignOut: ButtonProps["onClick"] = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      setLoading(false);
    }
  };

  if (!auth.user)
    return (
      <Stack component="form" spacing={2} p={2} maxWidth={500}>
        <Stack>Sign In</Stack>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          loading={loading}
          variant="contained"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Stack>
    );

  return (
    <Stack spacing={2} maxWidth={500}>
      <Stack>
        Congrats {auth.user.displayName || auth.user.email}, you are
        authenticated!
      </Stack>
      <Button loading={loading} variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Stack>
  );
}
