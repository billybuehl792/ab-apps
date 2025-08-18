import { Button, type ButtonProps } from "@mui/material";
import { Add } from "@mui/icons-material";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";

const EstimateCalculatorAddMaterialButton = (props: ButtonProps) => {
  /** Values */

  const { materialModal, setMaterialModal } = useEstimateCalculator();

  return (
    <Button
      variant="text"
      startIcon={<Add />}
      disabled={materialModal.open}
      onClick={() => {
        setMaterialModal(true, null);
      }}
      {...props}
    >
      Material
    </Button>
  );
};

export default EstimateCalculatorAddMaterialButton;
