import { createContext } from "react";
import { orderBy } from "firebase/firestore";

import { getMaterialList } from "@/lib/queries/firebase/materials";
import type { Material } from "@/types/firebase";
import { UseFormReturn } from "react-hook-form";
import type { EstimateCalculatorValues } from "../types";

interface EstimateCalculatorContextValue {
  queryOptions: ReturnType<typeof getMaterialList>;
  methods: UseFormReturn<
    EstimateCalculatorValues,
    unknown,
    EstimateCalculatorValues
  >;
  materialModal: { open: boolean; material: Material | null };
  setMaterialModal: (open: boolean, material?: Material | null) => void;
}

export default createContext<EstimateCalculatorContextValue>({
  queryOptions: getMaterialList(orderBy("value", "desc")),

  methods: {} as EstimateCalculatorContextValue["methods"],
  materialModal: { open: false, material: null },
  setMaterialModal: () => null,
});
