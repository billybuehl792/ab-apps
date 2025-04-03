import {
  type ContextType,
  type FC,
  type PropsWithChildren,
  useState,
} from "react";
import { signOut as _signOut } from "firebase/auth";
import { EstimateCalculatorContext } from "../context/EstimateCalculatorContext";
import { firestoreQueries } from "@/firebase/queries";
import { orderBy } from "firebase/firestore";

const EstimateCalculatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [materialModal, setMaterialModal] = useState<
    ContextType<typeof EstimateCalculatorContext>["materialModal"]
  >({ open: false, material: null });

  /** Values */

  const queryOptions = firestoreQueries.getMaterialList(
    orderBy("value", "desc")
  );

  return (
    <EstimateCalculatorContext.Provider
      value={{
        queryOptions,
        materialModal,
        setMaterialModal: (open, material) =>
          setMaterialModal({ open, material: material ?? null }),
      }}
    >
      {children}
    </EstimateCalculatorContext.Provider>
  );
};

export default EstimateCalculatorProvider;
