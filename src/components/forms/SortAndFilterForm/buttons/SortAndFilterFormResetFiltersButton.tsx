import { useFormContext } from "react-hook-form";
import { IconButton, Tooltip, type IconButtonProps } from "@mui/material";
import { FilterAltOff } from "@mui/icons-material";
import { type SortAndFilterFormValues } from "..";

const SortAndFilterFormResetFiltersButton = (props: IconButtonProps) => {
  /** Values */

  const { resetField } = useFormContext<SortAndFilterFormValues>();

  /** Callbacks */

  const handleResetFilters: IconButtonProps["onClick"] = () => {
    resetField("filters", { defaultValue: [] });
  };

  return (
    <Tooltip title="Reset Filters">
      <IconButton
        component="span"
        size="small"
        onClick={handleResetFilters}
        {...props}
      >
        <FilterAltOff fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default SortAndFilterFormResetFiltersButton;
