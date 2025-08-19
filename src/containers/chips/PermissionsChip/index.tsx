import { Chip, type ChipProps } from "@mui/material";
import { sxAsArray } from "@/store/utils/sx";
import type { Permissions } from "@/store/types/auth";
import { AuthRoleLabel } from "@/store/constants/auth";

interface PermissionsChipProps extends ChipProps {
  permissions?: Permissions | null;
}

const PermissionsChip = ({ permissions, ...props }: PermissionsChipProps) => {
  return (
    <Chip
      label={permissions?.role ? AuthRoleLabel[permissions.role] : "None"}
      size="small"
      variant={permissions?.role ? "filled" : "outlined"}
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sx={[{ opacity: permissions?.role ? 1 : 0.5 }, ...sxAsArray(props.sx)]}
    />
  );
};

export default PermissionsChip;
