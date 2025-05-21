import { type UseFormReturn } from "react-hook-form";
import type { Address, Material } from "@/types/firebase";
import { getMaterialList } from "@/lib/queries/firebase/materials";

export interface EstimateCalculatorContextValue {
  queryOptions: ReturnType<typeof getMaterialList>;
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
