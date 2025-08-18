import { type ReactNode, useState, type MouseEvent } from "react";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  type CardContentProps,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";
import { sxAsArray } from "@/store/utils/sx";
import { EMPTY_OBJECT } from "@/store/constants/utility";
import MenuOptionListDrawer from "@/components/modals/MenuOptionListDrawer";
import type { Material } from "@/store/types/materials";

interface MaterialCardProps extends Omit<CardProps, "onClick"> {
  material: Material;
  disabled?: boolean;
  options?: MenuOption[] | ((material: Material) => MenuOption[]);
  endContent?: ReactNode;
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
  onClick?: (material: Material, event: MouseEvent<HTMLButtonElement>) => void;
}

const MaterialCard = ({
  material,
  disabled,
  options: optionsProp,
  endContent,
  onClick: onClickProp,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = EMPTY_OBJECT,
  ...props
}: MaterialCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  /** Values */

  const options =
    typeof optionsProp === "function" ? optionsProp(material) : optionsProp;

  /** Callbacks */

  const onClick: CardActionAreaProps["onClick"] = (event) => {
    if (onClickProp) onClickProp(material, event);
    else if (options) handleToggleModalOpen();
  };

  const handleToggleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <Card id={material.id} {...props}>
      <CardActionArea
        disabled={disabled}
        onClick={onClick}
        {...cardActionAreaProps}
        sx={[
          { cursor: !!options || onClickProp ? "pointer" : "default" },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ...sxAsArray(cardActionAreaProps?.sx),
        ]}
      >
        <CardContent
          component={Stack}
          direction="row"
          spacing={1}
          alignItems="center"
          {...cardContentProps}
        >
          <Typography variant="body1" flexGrow={1} noWrap>
            {material.label.toTitleCase()}
          </Typography>
          <Typography variant="body2" noWrap>
            {material.value.toUSD()}
          </Typography>
          {endContent}
        </CardContent>
      </CardActionArea>

      {/* Modals */}
      {!!options && (
        <MenuOptionListDrawer
          title={material.label}
          options={options}
          open={modalOpen}
          onClose={handleToggleModalOpen}
        />
      )}
    </Card>
  );
};

export default MaterialCard;
