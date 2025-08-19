import {
  Avatar,
  AvatarProps,
  Box,
  type BoxProps,
  CircularProgress,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

interface AvatarDropzoneProps
  extends BoxProps,
    Pick<AvatarProps, "src" | "alt">,
    Pick<DropzoneOptions, "onDropAccepted"> {
  disabled?: boolean;
  loading?: boolean | number;
  size?: number;
  options?: DropzoneOptions;
}

const AvatarDropzone = ({
  src,
  alt,
  disabled,
  loading,
  options,
  size = 60,
  onDropAccepted,
  ...props
}: AvatarDropzoneProps) => {
  /** Values */

  const snackbar = useSnackbar();
  const dropzone = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 1,
    minSize: 1024, // 1KB
    maxSize: 1024 * 1024 * 10, // 10MB
    onDropAccepted,
    onDropRejected: (rejections) =>
      snackbar.enqueueSnackbar(rejections[0].errors[0].message, {
        variant: "error",
      }),
    ...options,
  });

  return (
    <Box position="relative" {...props}>
      <input type="hidden" {...dropzone.getInputProps()} />
      <IconButton
        disabled={disabled}
        loading={Boolean(loading)}
        {...dropzone.getRootProps()}
      >
        {loading ? (
          <Box position="relative">
            <Skeleton
              variant="circular"
              width={size}
              height={size}
              sx={{
                opacity: 0.5,
                transform: "scale(0.9)",
                bgcolor: ({ palette }) => palette.grey[200],
              }}
            />
            <CircularProgress
              variant="determinate"
              value={+loading * 100}
              size={size}
              thickness={5}
              color="info"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          </Box>
        ) : (
          <Avatar
            src={src}
            alt={alt}
            sx={{
              width: size,
              height: size,
              opacity: dropzone.isDragActive ? 0.5 : 1,
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default AvatarDropzone;
