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

import MenuOptionsMenu from "@/components/modals/MenuOptionsMenu";
import { sxAsArray } from "@/utils/sx";
import { EMPTY_OBJECT } from "@/constants/utility";
import type { Material } from "@/types/firebase";

interface MaterialCardProps extends Omit<CardProps, "onClick"> {
  material: Material;
  disabled?: boolean;
  options?: MenuOption[] | ((material: Material) => MenuOption[]);
  endContent?: ReactNode;
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
  };
  onClick?: (event: MouseEvent<HTMLButtonElement>, material: Material) => void;
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
  const [optionsAnchorEl, setOptionsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  /** Values */

  const options =
    typeof optionsProp === "function" ? optionsProp(material) : optionsProp;

  const cost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(material.value);

  /** Callbacks */

  const onClick: CardActionAreaProps["onClick"] = (event) => {
    if (onClickProp) onClickProp(event, material);
    else if (options) setOptionsAnchorEl(event.currentTarget);
  };

  return (
    <Card id={material.id} {...props}>
      <CardActionArea
        disabled={disabled}
        onClick={onClick}
        {...cardActionAreaProps}
        sx={[
          { cursor: !!options || onClickProp ? "pointer" : "default" },
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
          <Stack
            direction="row"
            spacing={1}
            flexGrow={1}
            alignItems="center"
            justifyItems="flex-start"
          >
            <Typography variant="body1" noWrap>
              {material.label.toTitleCase()}
            </Typography>
          </Stack>
          <Typography variant="body2" noWrap>
            {cost}
          </Typography>
          {endContent}
        </CardContent>
      </CardActionArea>

      {!!options && (
        <MenuOptionsMenu
          open={Boolean(optionsAnchorEl)}
          anchorEl={optionsAnchorEl}
          anchorOrigin={{ horizontal: "center", vertical: "center" }}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          options={options}
          onClose={() => {
            setOptionsAnchorEl(null);
          }}
        />
      )}
    </Card>
  );
};

export default MaterialCard;
