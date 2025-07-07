import { type ComponentProps } from "react";
import { Delete, Edit } from "@mui/icons-material";

import useMaterials from "@/hooks/firebase/useMaterials";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import MaterialCard from "@/containers/cards/MaterialCard";
import EstimateCalculatorCountField from "../fields/EstimateCalculatorCountField";

const EstimateCalculatorMaterialCard = ({
  material,
  index,
  ...props
}: ComponentProps<typeof MaterialCard> & { index: number }) => {
  /** Mutations */

  const {
    mutations: { archive },
  } = useMaterials();

  /** Values */

  const { setMaterialModal } = useEstimateCalculator();

  const options: MenuOption[] = [
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: () => {
        setMaterialModal(true, material);
      },
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Delete />,
      color: "error",
      confirm:
        "Are you sure you want to delete this material? This action cannot be undone.",
      onClick: () => {
        archive.mutate(material.id);
      },
    },
  ];

  return (
    <MaterialCard
      material={material}
      options={options}
      endContent={<EstimateCalculatorCountField index={index} />}
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialCard;
