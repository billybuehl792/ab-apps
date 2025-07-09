import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Menu } from "@mui/icons-material";
import NavigationDrawer from "@/containers/modals/NavigationDrawer";

const NavigationMenuIconButton = (props: IconButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  /** Values */

  const location = useLocation();

  /** Effects */

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        {...props}
      >
        <Menu />
      </IconButton>
      <NavigationDrawer
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
      />
    </>
  );
};

export default NavigationMenuIconButton;
