import { type FC, type MouseEvent } from "react";
import { type QueryDocumentSnapshot } from "firebase/firestore";
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
import MenuIconButton from "@/components/buttons/MenuIconButton";
import { sxUtils } from "@/utils/sx";
import type { MaterialData } from "@/firebase/types";
import type { MenuOption } from "@/types/global";

const classes = generateUtilityClasses("MaterialCard", [
  "root",
  "contentWrapper",
  "menuIconButton",
]);

interface MaterialCard extends Omit<CardProps, "onClick"> {
  material: QueryDocumentSnapshot<MaterialData>;
  disabled?: boolean;
  options?: MenuOption[];
  slotProps?: {
    cardActionArea?: CardActionAreaProps;
    cardContent?: CardContentProps;
    textField?: TextFieldProps;
  };
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    material: QueryDocumentSnapshot<MaterialData>
  ) => void;
}

const MaterialCard: FC<MaterialCard> = ({
  material,
  disabled,
  options,
  slotProps: {
    cardActionArea: cardActionAreaProps,
    cardContent: cardContentProps,
    textField: textFieldProps,
  } = {},
  onClick,
  ...props
}) => {
  /** Values */

  const { label, value } = material.data();

  const cost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return (
    <Card
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
        onClick={(event) => onClick?.(event, material)}
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
              {label.toTitleCase()}
            </Typography>
            {!!options && (
              <MenuIconButton
                className={classes.menuIconButton}
                options={options}
                sx={{
                  display: { xs: "none", sm: "inherit" },
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
    </Card>
  );
};

export default MaterialCard;
