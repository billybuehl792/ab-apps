import { IconButton, type IconButtonProps } from "@mui/material";
import { Edit, EditOff } from "@mui/icons-material";

interface EditIconButtonProps extends IconButtonProps {
  active?: boolean;
}

const EditIconButton = ({ active, ...props }: EditIconButtonProps) => {
  return (
    <IconButton component="span" {...props}>
      {active ? <EditOff fontSize="inherit" /> : <Edit fontSize="inherit" />}
    </IconButton>
  );
};

export default EditIconButton;
