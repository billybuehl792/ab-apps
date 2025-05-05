import {
  CircularProgress,
  type CircularProgressProps,
  Stack,
  type StackProps,
  Typography,
  type TypographyProps,
} from "@mui/material";

import { APP_TITLE } from "@/constants/layout";
import { EMPTY_OBJECT } from "@/constants/utility";

interface AppLoadingStateProps extends StackProps {
  slotProps?: {
    circularProgress?: CircularProgressProps;
    text?: TypographyProps;
  };
}

const AppLoadingState = ({
  slotProps: {
    circularProgress: circularProgressProps,
    text: textProps,
  } = EMPTY_OBJECT,
  ...props
}: AppLoadingStateProps) => {
  return (
    <Stack
      component="main"
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      right={0}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      bgcolor={({ palette }) => palette.primary.main}
      color={({ palette }) => palette.primary.contrastText}
      {...props}
    >
      <CircularProgress color="inherit" {...circularProgressProps} />
      <Typography variant="body2" {...textProps}>
        {APP_TITLE}
      </Typography>
    </Stack>
  );
};

export default AppLoadingState;
