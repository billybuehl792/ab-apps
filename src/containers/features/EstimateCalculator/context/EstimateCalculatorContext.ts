import { createContext } from "react";
import { orderBy } from "firebase/firestore";

import { getMaterialList } from "@/lib/queries/firebase/materials";
import type { Material } from "@/types/firebase";

interface EstimateCalculatorContextValue {
  queryOptions: ReturnType<typeof getMaterialList>;

  materialModal: { open: boolean; material: Material | null };
  setMaterialModal: (open: boolean, material?: Material | null) => void;
}

export default createContext<EstimateCalculatorContextValue>({
  queryOptions: getMaterialList(orderBy("value", "desc")),

  materialModal: { open: false, material: null },
  setMaterialModal: () => null,
});
