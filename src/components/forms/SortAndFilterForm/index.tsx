import { type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";

import Form from "@/components/forms/Form";
import SortAndFilterFormSortField from "./fields/SortAndFilterFormSortField";
import SortAndFilterFormFiltersField from "./fields/SortAndFilterFormFiltersField";
import { EMPTY_ARRAY } from "@/constants/utility";

export interface SortAndFilterFormValues<S = string, F = string> {
  sort: MenuOption<S> | null;
  filters: MenuOption<F>[];
}

interface SortAndFilterFormProps<
  S extends string = string,
  F extends string = string,
> extends Omit<
      ComponentProps<typeof Form<SortAndFilterFormValues<S, F>>>,
      "methods"
    >,
    UseFormProps<SortAndFilterFormValues<S, F>> {
  sortOptions?: MenuOption<S>[];
  filterOptions?: MenuOption<F>[];
}

const SortAndFilterForm = <
  S extends string = string,
  F extends string = string,
>({
  sortOptions = EMPTY_ARRAY,
  filterOptions = EMPTY_ARRAY,
  ...props
}: SortAndFilterFormProps<S, F>) => {
  /** Values */

  const methods = useForm<SortAndFilterFormValues<S, F>>({
    mode: "onSubmit",
    defaultValues: { sort: null, filters: [] },
    ...props,
  });

  return (
    <Form
      methods={methods}
      {...props}
      slotProps={{
        ...props.slotProps,
        actions: { submitLabel: "Apply", ...props.slotProps?.actions },
      }}
    >
      {Boolean(sortOptions.length) && (
        <SortAndFilterFormSortField options={sortOptions} />
      )}
      {Boolean(filterOptions.length) && (
        <SortAndFilterFormFiltersField options={filterOptions} />
      )}
    </Form>
  );
};

export default SortAndFilterForm;
