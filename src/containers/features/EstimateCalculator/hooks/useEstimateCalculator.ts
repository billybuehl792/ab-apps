import { useContext } from "react";
import EstimateCalculatorContext from "../context/EstimateCalculatorContext";

const useEstimateCalculator = () => {
  const context = useContext(EstimateCalculatorContext);
  if (!context)
    throw new Error(
      "useEstimateCalculator must be used within an EstimateCalculatorProvider"
    );
  return context;
};

export default useEstimateCalculator;
