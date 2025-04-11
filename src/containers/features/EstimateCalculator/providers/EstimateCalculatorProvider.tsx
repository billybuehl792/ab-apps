import {
  type ContextType,
  type FC,
  type PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { signOut as _signOut } from "firebase/auth";
import { orderBy } from "firebase/firestore";

import EstimateCalculatorContext from "../context/EstimateCalculatorContext";
import { getMaterialList } from "@/lib/queries/firebase/materials";

const EstimateCalculatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [materialModal, setMaterialModal] = useState<
    ContextType<typeof EstimateCalculatorContext>["materialModal"]
  >({ open: false, material: null });

  /** Values */

  const queryOptions = getMaterialList(orderBy("value", "desc"));

  return (
    <EstimateCalculatorContext
      value={useMemo(
        () => ({
          queryOptions,
          materialModal,
          setMaterialModal: (open, material) => {
            setMaterialModal({ open, material: material ?? null });
          },
        }),
        [queryOptions, materialModal, setMaterialModal]
      )}
    >
      {children}
    </EstimateCalculatorContext>
  );
};

export default EstimateCalculatorProvider;
