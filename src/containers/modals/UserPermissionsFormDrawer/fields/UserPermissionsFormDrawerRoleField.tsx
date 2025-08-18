import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AuthRole } from "@/store/enums/auth";
import { AuthRoleLabel } from "@/store/constants/auth";
import type { Permissions } from "@/store/types/auth";

const UserPermissionsFormDrawerRoleField = () => {
  /** Values */

  const methods = useFormContext<Permissions>();

  return (
    <Controller
      name="role"
      control={methods.control}
      rules={{ required: "Role is required" }}
      render={({ field, formState }) => (
        <FormControl required error={Boolean(formState.errors.role)}>
          <InputLabel id="permissions-role-label">Role</InputLabel>
          <Select
            labelId="permissions-role-label"
            id="permissions-role-select"
            label="Role"
            size="small"
            {...field}
          >
            {Object.values(AuthRole).map((option) => (
              <MenuItem key={option} value={option}>
                {AuthRoleLabel[option]}
              </MenuItem>
            ))}
          </Select>

          {!!formState.errors.role && (
            <FormHelperText error>
              {formState.errors.role.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default UserPermissionsFormDrawerRoleField;
