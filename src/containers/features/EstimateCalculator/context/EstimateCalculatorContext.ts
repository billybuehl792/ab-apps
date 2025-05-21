import { createContext } from "react";
import { orderBy } from "firebase/firestore";

import { getMaterialList } from "@/lib/queries/firebase/materials";
import type { EstimateCalculatorContextValue } from "../types";

export default createContext<EstimateCalculatorContextValue>({
  queryOptions: getMaterialList(orderBy("value", "desc")),

  methods: {} as EstimateCalculatorContextValue["methods"],
  materialModal: { open: false, material: null },
  setMaterialModal: () => null,
});
