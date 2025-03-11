import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import "./App.css";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>It Works</Typography>
      <Button onClick={() => setCount(count + 1)}>Click Me: {count}</Button>
    </Stack>
  );
};

export default App;
