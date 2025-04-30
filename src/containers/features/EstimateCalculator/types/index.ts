import type { Address, Material } from "@/types/firebase";

export interface EstimateCalculatorValues {
  name: string;
  address: Address;
  tax: number;
  additional?: number;
  materials: (Material & { count: number | null })[];
}
