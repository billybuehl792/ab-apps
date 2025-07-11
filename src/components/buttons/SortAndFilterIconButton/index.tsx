import { type ComponentProps, useState } from "react";
import {
  Badge,
  IconButton,
  Tooltip,
  type IconButtonProps,
} from "@mui/material";
import { Tune } from "@mui/icons-material";
import SortAndFilterDrawer from "@/components/modals/SortAndFilterDrawer";
import SortAndFilterForm from "@/components/forms/SortAndFilterForm";

interface SortAndFilterIconButtonProps
  extends Omit<IconButtonProps, "form" | "onSubmit">,
    Pick<
      ComponentProps<typeof SortAndFilterForm>,
      "values" | "sortOptions" | "filterOptions" | "onSubmit"
    > {
  slotProps?: {
    drawer?: Partial<ComponentProps<typeof SortAndFilterDrawer>>;
  };
}

const SortAndFilterIconButton = ({
  values,
  sortOptions,
  filterOptions,
  onSubmit,
  onClick: onClickProp,
  slotProps,
  ...props
}: SortAndFilterIconButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  /** Values */

  const includeDrawer = !onClickProp;
  const count = (values?.filters.length ?? 0) + (values?.sort ? 1 : 0);

  /** Callbacks */

  const handleOnClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();

    if (includeDrawer) setModalOpen((prev) => !prev);
    else onClickProp(event);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Sort & Filter Options">
        <IconButton component="span" onClick={handleOnClick} {...props}>
          <Badge badgeContent={count} color="primary">
            <Tune />
          </Badge>
        </IconButton>
      </Tooltip>
      {includeDrawer && (
        <SortAndFilterDrawer
          open={modalOpen}
          values={values}
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          onSubmit={onSubmit}
          onClose={handleCloseModal}
          {...slotProps?.drawer}
        />
      )}
    </>
  );
};

export default SortAndFilterIconButton;
