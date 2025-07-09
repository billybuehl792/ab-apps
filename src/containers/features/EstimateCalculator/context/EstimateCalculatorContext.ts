import { createContext } from "react";
import type { EstimateCalculatorContextValue } from "../types";

export default createContext<EstimateCalculatorContextValue>({
  queryOptions: {} as EstimateCalculatorContextValue["queryOptions"],

  methods: {} as EstimateCalculatorContextValue["methods"],
  materialModal: { open: false, material: null },
  setMaterialModal: () => null,
});
