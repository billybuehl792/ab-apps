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
import { useForm } from "react-hook-form";
import { EstimateCalculatorValues } from "../types";
import { ESTIMATE_CALCULATOR_DEFAULT_VALUES } from "../constants";

const EstimateCalculatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [materialModal, setMaterialModal] = useState<
    ContextType<typeof EstimateCalculatorContext>["materialModal"]
  >({ open: false, material: null });

  /** Values */

  const queryOptions = getMaterialList(orderBy("value", "desc"));
  const methods = useForm<EstimateCalculatorValues>({
    defaultValues: ESTIMATE_CALCULATOR_DEFAULT_VALUES,
  });

  return (
    <EstimateCalculatorContext
      value={useMemo(
        () => ({
          queryOptions,
          methods,
          materialModal,
          setMaterialModal: (open, material) => {
            setMaterialModal({ open, material: material ?? null });
          },
        }),
        [queryOptions, methods, materialModal, setMaterialModal]
      )}
    >
      {children}
    </EstimateCalculatorContext>
  );
};

export default EstimateCalculatorProvider;
