import { type ComponentProps } from "react";
import { Delete, Edit } from "@mui/icons-material";

import useMaterials from "@/hooks/firebase/useMaterials";
import useEstimateCalculator from "../../hooks/useEstimateCalculator";
import MaterialCard from "@/containers/cards/MaterialCard";
import IntegerField from "@/components/fields/IntegerField";

const MIN = 0;
const MAX = 10_000;

const EstimateCalculatorMaterialCard = ({
  material,
  index,
  ...props
}: ComponentProps<typeof MaterialCard> & { index: number }) => {
  /** Mutations */

  const { archive } = useMaterials();

  /** Values */

  const {
    methods: {
      formState: { errors },
      register,
    },
    setMaterialModal,
  } = useEstimateCalculator();

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
      onClick: () => {
        archive.mutate(material.id);
      },
    },
  ];

  return (
    <MaterialCard
      material={material}
      options={options}
      endContent={
        <IntegerField
          size="small"
          error={!!errors.materials?.[index]?.count}
          onClick={(event) => {
            event.stopPropagation();
          }}
          sx={{ width: 100 }}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          {...register(`materials.${index}.count`, {
            min: { value: MIN, message: `Min value is ${String(MIN)}` },
            max: { value: MAX, message: `Max value is ${String(MAX)}` },
            setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
          })}
        />
      }
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialCard;
