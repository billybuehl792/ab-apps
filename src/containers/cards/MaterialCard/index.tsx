import { type ReactNode, useState, type FC, type MouseEvent } from "react";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  type CardContentProps,
  type CardProps,
  generateUtilityClasses,
  Stack,
  Typography,
} from "@mui/material";
import { LongPressEventType, useLongPress } from "use-long-press";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import MenuOptionsDrawer from "@/components/modals/MenuOptionsDrawer";
import { sxUtils } from "@/utils/sx";
import type { Material } from "@/firebase/types";

const classes = generateUtilityClasses("MaterialCard", [
  "root",
  "contentWrapper",
  "menuIconButton",
]);

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

const MaterialCard: FC<MaterialCardProps> = ({
  material,
  disabled,
  options: optionsProp,
  endContent,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
  } = {},
  onClick,
  ...props
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  /** Values */

  const touchHandlers = useLongPress(() => setOptionsOpen(true), {
    detect: LongPressEventType.Touch,
    threshold: 500,
    cancelOnMovement: true,
    cancelOutsideElement: true,
  });

  const options =
    typeof optionsProp === "function" ? optionsProp(material) : optionsProp;

  const cost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(material.value);

  return (
    <Card
      id={material.id}
      className={classes.root}
      {...props}
      sx={[
        {
          "@media (hover:hover)": {
            "&:hover": {
              [`.${classes.menuIconButton}`]: {
                visibility: "visible",
              },
            },
          },
        },
        ...sxUtils.asArray(props?.sx),
      ]}
    >
      <CardActionArea
        disabled={disabled}
        disableTouchRipple={!onClick}
        onClick={(event) => onClick?.(event, material)}
        {...touchHandlers()}
        {...cardActionAreaProps}
        sx={[
          { cursor: onClick ? "pointer" : "default" },
          ...sxUtils.asArray(cardActionAreaProps?.sx),
        ]}
      >
        <CardContent
          className={classes.contentWrapper}
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
            {!!options && (
              <MenuOptionsIconButton
                className={classes.menuIconButton}
                options={options}
                sx={{
                  display: { xs: "none", sm: "inherit" },
                  "@media (hover:none)": {
                    display: "none",
                  },
                  "@media (hover: hover)": {
                    visibility: "hidden",
                  },
                }}
              />
            )}
          </Stack>
          <Typography variant="body2" noWrap>
            {cost}
          </Typography>
          {endContent}
        </CardContent>
      </CardActionArea>

      {/* Modals */}
      {!!options && (
        <MenuOptionsDrawer
          open={optionsOpen}
          options={options}
          onClose={() => setOptionsOpen(false)}
        />
      )}
    </Card>
  );
};

export default MaterialCard;
