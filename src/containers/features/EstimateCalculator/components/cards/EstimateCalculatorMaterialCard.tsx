import { ComponentProps, type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Delete, Edit } from "@mui/icons-material";
import { useEstimateCalculator } from "../../context/EstimateCalculatorContext";
import { firestoreMutations } from "@/firebase/mutations";
import MaterialCard from "@/containers/cards/MaterialCard";
import IntegerField from "@/components/fields/IntegerField";
import type { EstimateCalculatorValues } from "../../types";

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
          sx={{ width: 100 }}
          {...register(`materials.${index}.count`, {
            setValueAs: (value) => Math.min(Math.max(+value, 0), 10_000),
            min: { value: 0, message: "Min value is 0" },
            max: { value: 1000, message: "Max value is 1000" },
          })}
        />
      }
      {...props}
    />
  );
};

export default EstimateCalculatorMaterialCard;
