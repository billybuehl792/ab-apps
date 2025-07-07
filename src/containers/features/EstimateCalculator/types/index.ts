import { type UseFormReturn } from "react-hook-form";
import useMaterials from "@/hooks/firebase/useMaterials";
import type { Address, Material } from "@/types/firebase";

export interface EstimateCalculatorContextValue {
  queryOptions: ReturnType<ReturnType<typeof useMaterials>["queries"]["list"]>;
  methods: UseFormReturn<
    EstimateCalculatorValues,
    unknown,
    EstimateCalculatorValues
  >;
  materialModal: { open: boolean; material: Material | null };
  setMaterialModal: (open: boolean, material: Material | null) => void;
}

export interface EstimateCalculatorValues {
  name: string;
  address: Address;
  tax: number;
  additional?: number;
  materials: (Material & { count: number | null })[];
}
