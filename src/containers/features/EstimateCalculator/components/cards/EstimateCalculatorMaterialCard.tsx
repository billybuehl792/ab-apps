import { ComponentProps, type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Delete, Edit } from "@mui/icons-material";
import { useEstimateCalculator } from "../../context/EstimateCalculatorContext";
import { firestoreMutations } from "@/firebase/mutations";
import MaterialCard from "@/containers/cards/MaterialCard";
import IntegerField from "@/components/fields/IntegerField";
import type { EstimateCalculatorValues } from "../../types";

const MIN = 0;
const MAX = 10_000;

const EstimateCalculatorMaterialCard: FC<
  ComponentProps<typeof MaterialCard> & { index: number }
> = ({ material, index, ...props }) => {
  /** Mutations */

  const { remove } = firestoreMutations.useMaterialMutations();

  /** Values */

  const { setMaterialModal } = useEstimateCalculator();
  const {
    formState: { errors },
    register,
  } = useFormContext<EstimateCalculatorValues>();

  const options: MenuOption[] = [
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: () => setMaterialModal(true, material),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Delete />,
      onClick: () => remove.mutate(material.id),
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
          onClick={(event) => event.stopPropagation()}
          sx={{ width: 100 }}
          {...register(`materials.${index}.count`, {
            min: { value: MIN, message: `Min value is ${MIN}` },
            max: { value: MAX, message: `Max value is ${MAX}` },
            setValueAs: (value) => Math.min(Math.max(+value, MIN), MAX),
          })}
        />
      }
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialCard;
