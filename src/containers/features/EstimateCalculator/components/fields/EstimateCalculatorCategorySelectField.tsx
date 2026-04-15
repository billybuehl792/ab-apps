import React from "react";
import {
  Chip,
  FormControl,
  type FormControlProps,
  ListItemIcon,
  ListItemText,
  MenuItem,
  type MenuItemProps,
  Select,
  type SelectProps,
  Typography,
} from "@mui/material";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import { ESTIMATE_CALCULATOR_CATEGORY_OPTIONS } from "../../constants";
import type { TEstimateCalculatorCategory } from "../../types";

interface IEstimateCalculatorCategorySelectFieldProps extends FormControlProps {
  slotProps?: {
    select?: Omit<SelectProps, "value" | "onChange" | "renderValue">;
    menuItem?: Omit<MenuItemProps, "value">;
  };
}

const EstimateCalculatorCategorySelectField: React.FC<
  IEstimateCalculatorCategorySelectFieldProps
> = ({ slotProps, ...props }) => {
  /** Values */

  const { category, onCategoryChange } = useEstimateCalculator();
  const selectedCategory = ESTIMATE_CALCULATOR_CATEGORY_OPTIONS.find(
    (option) => option.value === category,
  );

  return (
    <FormControl fullWidth {...props}>
      <Select
        id={"estimate-calculator-category-select"}
        displayEmpty
        value={category}
        renderValue={() => (
          <Chip
            icon={
              selectedCategory?.Icon ? <selectedCategory.Icon /> : undefined
            }
            size="small"
            label={selectedCategory?.label ?? "-"}
          />
        )}
        onChange={(event) =>
          onCategoryChange(event.target.value as TEstimateCalculatorCategory)
        }
        {...slotProps?.select}
      >
        {ESTIMATE_CALCULATOR_CATEGORY_OPTIONS.map((category) => (
          <MenuItem
            key={category.value}
            value={category.value}
            {...slotProps?.menuItem}
          >
            <ListItemIcon>
              <category.Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">{category.label}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EstimateCalculatorCategorySelectField;
