import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Menu } from "@mui/icons-material";
import NavigationDrawer from "@/containers/modals/NavigationDrawer";

const NavigationMenuIconButton = (props: IconButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  /** Values */

  const location = useLocation();

  /** Callbacks */

  const handleToggleMenuOpen = () => {
    setMenuOpen((prev) => !prev);
  };

  /** Effects */

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <IconButton color="inherit" onClick={handleToggleMenuOpen} {...props}>
        <Menu />
      </IconButton>
      <NavigationDrawer open={menuOpen} onClose={handleToggleMenuOpen} />
    </>
  );
};

export default NavigationMenuIconButton;
