import { type ComponentProps, useState } from "react";
import { Button, Collapse, collapseClasses, Stack } from "@mui/material";
import { useForm, type UseFormProps } from "react-hook-form";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

import Form from "@/components/forms/Form";
import MaterialFormValueField from "./fields/MaterialFormValueField";
import MaterialFormTitleField from "./fields/MaterialFormTitleField";
import MaterialFormDescriptionField from "./fields/MaterialFormDescriptionField";
import type { MaterialData } from "@/types/firebase";

type MaterialFormProps = Omit<
  ComponentProps<typeof Form<MaterialData>>,
  "methods"
> &
  UseFormProps<MaterialData>;

const MaterialForm = (props: MaterialFormProps) => {
  const [showMoreEnabled, setShowMoreEnabled] = useState(false);

  /** Values */

  const methods = useForm<MaterialData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      label: "",
      value: undefined,
      description: "",
    },
    ...props,
  });

  return (
    <Form methods={methods} {...props}>
      <MaterialFormTitleField />
      <MaterialFormValueField />
      <Stack direction="row" justifyContent="center">
        <Button
          size="small"
          endIcon={showMoreEnabled ? <ArrowDropUp /> : <ArrowDropDown />}
          onClick={() => {
            setShowMoreEnabled((prev) => !prev);
          }}
        >
          Show {showMoreEnabled ? "Less" : "More"}
        </Button>
      </Stack>
      <Collapse
        in={showMoreEnabled}
        sx={{
          mt: "0 !important",
          [`.${collapseClasses.wrapperInner}`]: { mt: 2 },
        }}
      >
        <MaterialFormDescriptionField />
      </Collapse>
    </Form>
  );
};

export default MaterialForm;
