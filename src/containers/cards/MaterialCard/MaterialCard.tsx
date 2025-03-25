import { ReactNode, type FC, type MouseEvent } from "react";
import { type QueryDocumentSnapshot } from "firebase/firestore";
import {
  Card,
  CardActionArea,
  CardContent,
  type CardProps,
  generateUtilityClasses,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { sxUtils } from "@/utils/sx";
import type { MaterialData } from "@/firebase/types";
import type { MenuOption } from "@/types/global";

const classes = generateUtilityClasses("MaterialCard", [
  "root",
  "contentWrapper",
  "metadata",
  "editIconButton",
  "menuIconButton",
]);

interface MaterialCard extends Omit<CardProps, "onClick" | "content"> {
  material: QueryDocumentSnapshot<MaterialData>;
  disabled?: boolean;
  content?: ReactNode;
  options?:
    | MenuOption[]
    | ((material: QueryDocumentSnapshot<MaterialData>) => MenuOption[]);
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    material: QueryDocumentSnapshot<MaterialData>
  ) => void;
}

const MaterialCard: FC<MaterialCard> = ({
  material,
  disabled,
  content,
  options: optionsProp,
  onClick,
  ...props
}) => {
  /** Values */

  const { label, value } = material.data();

  const cost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  const options =
    typeof optionsProp === "object" ? optionsProp : optionsProp?.(material);

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
        disableTouchRipple
        disabled={disabled}
        onClick={(event) => onClick?.(event, material)}
      >
        <CardContent
          className={classes.contentWrapper}
          component={Stack}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            className={classes.metadata}
            container
            direction="row"
            flexGrow={1}
            alignItems="center"
          >
            <Grid
              component={Typography}
              size={{ xs: "auto", sm: 3, md: 2 }}
              noWrap
              mr={1}
            >
              {label.toTitleCase()}
            </Grid>
            <Grid
              component={Typography}
              size={{ xs: "grow", sm: "grow" }}
              noWrap
            >
              {cost}
            </Grid>
            {!!content && (
              <Grid size={{ xs: 2 }} minWidth={60}>
                {content}
              </Grid>
            )}
          </Grid>

          {/* {!!options && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <MenuIconButton
                className={classes.menuIconButton}
                size="small"
                options={options}
                sx={{
                  "@media (hover: hover)": {
                    visibility: "hidden",
                  },
                }}
              />
            </Box>
          )} */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MaterialCard;
