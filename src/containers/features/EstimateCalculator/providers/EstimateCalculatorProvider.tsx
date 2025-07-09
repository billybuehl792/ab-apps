import { type PropsWithChildren } from "react";
import EstimateCalculatorContext from "../context/EstimateCalculatorContext";
import type { EstimateCalculatorContextValue } from "../types";

const EstimateCalculatorProvider = ({
  value,
  children,
}: PropsWithChildren & { value: EstimateCalculatorContextValue }) => {
  return (
    <EstimateCalculatorContext value={value}>
      {children}
    </EstimateCalculatorContext>
  );
};

export default EstimateCalculatorProvider;
