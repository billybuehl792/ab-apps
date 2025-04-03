import { type ComponentProps, type FC, useState } from "react";
import { Button, Collapse, collapseClasses, Stack } from "@mui/material";
import { FormProvider, useForm, type UseFormProps } from "react-hook-form";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Form from "@/components/forms/Form";
import MaterialFormValueField from "./fields/MaterialFormValueField";
import MaterialFormTitleField from "./fields/MaterialFormTitleField";
import MaterialFormDescriptionField from "./fields/MaterialFormDescriptionField";
import type { MaterialData } from "@/firebase/types";

type MaterialFormProps = ComponentProps<typeof Form<MaterialData>> &
  UseFormProps<MaterialData>;

const MaterialForm: FC<MaterialFormProps> = (props) => {
  const [showMoreEnabled, setShowMoreEnabled] = useState(false);

  /** Values */

  const methods = useForm<MaterialData>(props);

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        <MaterialFormTitleField />
        <MaterialFormValueField />

        <Stack direction="row" justifyContent="center">
          <Button
            size="small"
            endIcon={showMoreEnabled ? <ArrowDropUp /> : <ArrowDropDown />}
            onClick={() => setShowMoreEnabled((prev) => !prev)}
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
    </FormProvider>
  );
};

export default MaterialForm;
