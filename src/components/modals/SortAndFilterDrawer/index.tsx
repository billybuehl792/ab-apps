import { type ComponentProps } from "react";
import { useMediaQuery } from "@mui/material";
import SwipeableDrawer from "../SwipeableDrawer";
import SortAndFilterForm from "@/components/forms/SortAndFilterForm";

type SortAndFilterDrawerProps = Omit<
  Partial<ComponentProps<typeof SwipeableDrawer>>,
  "onSubmit"
> &
  Pick<
    ComponentProps<typeof SortAndFilterForm>,
    "values" | "sortOptions" | "filterOptions" | "onSubmit"
  >;

const SortAndFilterFormDrawer = ({
  title = "Sort & Filter",
  values,
  sortOptions,
  filterOptions,
  onSubmit,
  onClose,
  ...props
}: SortAndFilterDrawerProps) => {
  /** Values */

  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  /** Callbacks */

  const handleSubmit: ComponentProps<typeof SortAndFilterForm>["onSubmit"] = (
    data
  ) => {
    onSubmit(data);
    onClose?.();
  };

  return (
    <SwipeableDrawer
      title={title}
      anchor={isSm ? "right" : "bottom"}
      onClose={onClose}
      {...props}
    >
      <SortAndFilterForm
        values={values}
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        onSubmit={handleSubmit}
        onReset={onClose}
        sx={{ flexGrow: 1, minWidth: 400 }}
        slotProps={{
          fieldset: { flexGrow: 1, p: 2, pb: 0 },
          actions: {
            resetAsCancel: true,
            direction: "column",
            position: "sticky",
            bottom: 0,
            px: 2,
            pb: 2,
            bgcolor: ({ palette }) => palette.background.paper,
            zIndex: 1,
            slotProps: {
              submitButton: { size: "large", loading: false },
              resetButton: { size: "large" },
            },
          },
        }}
      />
    </SwipeableDrawer>
  );
};

export default SortAndFilterFormDrawer;
