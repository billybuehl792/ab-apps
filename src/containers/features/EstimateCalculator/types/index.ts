import type { Material } from "@/firebase/types";

export interface EstimateCalculatorValues {
  name?: string;
  address?: string;
  tax: number;
  additional?: number;
  materials: (Material & { count: number | null })[];
}
