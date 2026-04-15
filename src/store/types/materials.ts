import type { TEstimateCalculatorCategory } from "@/containers/features/EstimateCalculator/types";

export interface Material {
  id: string;
  category: TEstimateCalculatorCategory;
  label: string;
  value: number;
  description: string;
}
