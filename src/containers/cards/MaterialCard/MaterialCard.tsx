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
import MenuIconButton from "@/components/buttons/MenuIconButton";

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
  options?: MenuOption[];
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    material: QueryDocumentSnapshot<MaterialData>
  ) => void;
}

const MaterialCard: FC<MaterialCard> = ({
  material,
  disabled,
  content,
  options,
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
            spacing={1.5}
            flexGrow={1}
            alignItems="center"
          >
            <Grid size={{ xs: 3, md: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
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
            </Grid>
            <Grid
              component={Typography}
              size={{ xs: "grow" }}
              variant="body2"
              noWrap
            >
              {cost}
            </Grid>
            {!!content && <Grid width={80}>{content}</Grid>}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MaterialCard;
