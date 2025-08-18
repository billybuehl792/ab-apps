import type { EstimateCalculatorForm } from "../types";

export const ESTIMATE_CALCULATOR_DEFAULT_VALUES: EstimateCalculatorForm = {
  address: {
    place_id: "",
    primary_text: "",
    secondary_text: "",
    text: "",
  },
  materials: [],
  name: "",
  tax: 7,
};
