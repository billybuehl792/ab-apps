import { useFormContext } from "react-hook-form";
import { IconButton, Tooltip, type IconButtonProps } from "@mui/material";
import { FilterListOff } from "@mui/icons-material";
import { type SortAndFilterFormValues } from "..";

const SortAndFilterFormResetSortButton = (props: IconButtonProps) => {
  /** Values */

  const { resetField } = useFormContext<SortAndFilterFormValues>();

  /** Callbacks */

  const handleResetFilters: IconButtonProps["onClick"] = () => {
    resetField("sort", { defaultValue: null });
  };

  return (
    <Tooltip title="Reset Sort">
      <IconButton
        component="span"
        size="small"
        onClick={handleResetFilters}
        {...props}
      >
        <FilterListOff fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default SortAndFilterFormResetSortButton;
