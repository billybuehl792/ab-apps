import { useState, type FC, type MouseEvent } from "react";
import {
  Card,
  CardActionArea,
  type CardActionAreaProps,
  CardContent,
  type CardContentProps,
  type CardProps,
  generateUtilityClasses,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";
import { LongPressEventType, useLongPress } from "use-long-press";
import MenuIconButton from "@/components/buttons/MenuIconButton";
import OptionDrawer from "@/components/modals/OptionDrawer";
import { sxUtils } from "@/utils/sx";
import type { MenuOption } from "@/types/global";
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
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
    textField?: TextFieldProps;
  };
  onClick?: (event: MouseEvent<HTMLButtonElement>, material: Material) => void;
}

const MaterialCard: FC<MaterialCardProps> = ({
  material,
  disabled,
  options: optionsProp,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
    textField: textFieldProps,
  } = {},
  onClick,
  ...props
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  /** Values */

  const touchHandlers = useLongPress(() => setOptionsOpen(true), {
    detect: LongPressEventType.Touch,
    threshold: 500,
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
      variant="outlined"
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
              <MenuIconButton
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
          <TextField
            variant="outlined"
            type="number"
            size="small"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            slotProps={{
              input: { inputProps: { min: 0, max: 1000 } },
            }}
            {...textFieldProps}
          />
        </CardContent>
      </CardActionArea>

      {/* Modals */}
      {!!options && (
        <OptionDrawer
          open={optionsOpen}
          options={options}
          onClose={() => setOptionsOpen(false)}
        />
      )}
    </Card>
  );
};

export default MaterialCard;
