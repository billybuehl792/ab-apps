import { useEffect, useMemo, type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import { Stack, type StackProps } from "@mui/material";
import { firestoreQueries } from "@/firebase/queries";
import EstimateCalculatorHeader from "./layout/EstimateCalculatorHeader";
import EstimateCalculatorFieldArray from "./layout/EstimateCalculatorFieldArray";
import EstimateCalculatorMeta from "./layout/EstimateCalculatorMeta";
import EstimateCalculatorFooter from "./layout/EstimateCalculatorFooter";
import type { Material } from "@/firebase/types";

export interface EstimateCalculatorFormValues {
  name: string;
  address: string;
  tax: number;
  materials: (Material & { count?: number | null })[];
}

const DEFAULT_VALUES: EstimateCalculatorFormValues = {
  name: "",
  address: "",
  tax: 7,
  materials: [],
};

const EstimateCalculator: FC<StackProps> = (props) => {
  /** Queries */

  const materialsQuery = useQuery(
    firestoreQueries.getMaterialList(orderBy("value", "desc"))
  );
  const materials = useMemo(
    () =>
      materialsQuery.data?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) ??
      [],
    [materialsQuery.data]
  );

  /** Values */

  const methods = useForm<EstimateCalculatorFormValues>({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
    values: { ...DEFAULT_VALUES, materials },
    ...props,
  });

  /** Effects */

  useEffect(() => {
    methods.reset({ ...DEFAULT_VALUES, materials }, { keepValues: true });
  }, [methods, materials]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ position: "relative", overflow: "auto" }}>
        <Stack
          spacing={2}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            p: 2,
            pb: 0,
            bgcolor: ({ palette }) => palette.background.default,
          }}
        >
          <EstimateCalculatorHeader />
          <EstimateCalculatorMeta />
        </Stack>

        <EstimateCalculatorFieldArray p={2} pb={1} />

        <EstimateCalculatorFooter
          sx={{ position: "sticky", bottom: 0, p: 2, pt: 0 }}
        />
      </Stack>
    </FormProvider>
  );
};

export default EstimateCalculator;
