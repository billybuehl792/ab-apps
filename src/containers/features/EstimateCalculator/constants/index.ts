import { HouseSiding, Roofing } from "@mui/icons-material";
import { type EstimateCalculatorForm } from "../types";

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

export const ESTIMATE_CALCULATOR_CATEGORY_OPTIONS = [
  { value: "roof", label: "Roof", Icon: Roofing },
  { value: "siding", label: "Siding", Icon: HouseSiding },
] as const;
