import { createContext } from "react";
import type { EstimateCalculatorContextValue } from "../types";
import { ESTIMATE_CALCULATOR_CATEGORY_OPTIONS } from "../constants";

export default createContext<EstimateCalculatorContextValue>({
  queryOptions: {} as EstimateCalculatorContextValue["queryOptions"],
  methods: {} as EstimateCalculatorContextValue["methods"],
  materialModal: { open: false, material: null },
  category: ESTIMATE_CALCULATOR_CATEGORY_OPTIONS[0].value,
  setMaterialModal: () => null,
  onCategoryChange: () => null,
});
