import { type UseFormReturn } from "react-hook-form";
import useMaterials from "@/store/hooks/useMaterials";
import { ESTIMATE_CALCULATOR_CATEGORY_OPTIONS } from "../constants";
import type { Address } from "@/store/types/locations";
import type { Material } from "@/store/types/materials";

export type TEstimateCalculatorCategory =
  (typeof ESTIMATE_CALCULATOR_CATEGORY_OPTIONS)[number]["value"];

export interface EstimateCalculatorForm {
  name: string;
  address: Address;
  tax: number;
  additional?: number;
  materials: (Material & { count: number | null })[];
}

export interface EstimateCalculatorContextValue {
  queryOptions: ReturnType<ReturnType<typeof useMaterials>["queries"]["list"]>;
  methods: UseFormReturn<
    EstimateCalculatorForm,
    unknown,
    EstimateCalculatorForm
  >;
  category: TEstimateCalculatorCategory;
  onCategoryChange: (category: TEstimateCalculatorCategory) => void;
  materialModal: { open: boolean; material: Material | null };
  setMaterialModal: (open: boolean, material: Material | null) => void;
}
