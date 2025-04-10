import type { Material } from "@/types/firebase";

export interface EstimateCalculatorValues {
  name?: string;
  address?: string;
  tax: number;
  additional?: number;
  materials: (Material & { count: number | null })[];
}
