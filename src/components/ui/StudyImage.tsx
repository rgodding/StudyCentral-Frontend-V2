import { Box, Image, type BoxProps, type ImageProps } from "@chakra-ui/react";

export type StudyImageVariant =
  | "default"
  | "icon"
  | "logo"
  | "avatar"
  | "cover";

export type StudyImageProps = Omit<BoxProps, "children"> & {
  src: string;
  alt: string;
  variant?: StudyImageVariant;
  imageProps?: Omit<ImageProps, "src" | "alt">;
};

const variantStyles: Record<
  StudyImageVariant,
  {
    box: BoxProps;
    image: ImageProps;
  }
> = {
  default: {
    box: {
      overflow: "hidden",
      rounded: "card",
      bg: "panelBgSubtle",
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
    },
  },

  icon: {
    box: {
      boxSize: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
      userSelect: "none",
    },
    image: {
      boxSize: "28px",
      objectFit: "contain",
      draggable: false,
    },
  },

  logo: {
    box: {
      w: "48px",
      h: "48px",
      p: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
      userSelect: "none",
      rounded: "sm",
      borderWidth: "1px",
      borderColor: "borderSubtle",
      bg: "surfaceBg",
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "fill",
      transform: "scale(1.35)",
      draggable: false,
    },
  },

  avatar: {
    box: {
      boxSize: "40px",
      rounded: "full",
      overflow: "hidden",
      bg: "panelBgSubtle",
      flexShrink: 0,
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
      draggable: false,
    },
  },

  cover: {
    box: {
      w: "full",
      aspectRatio: "16 / 9",
      overflow: "hidden",
      rounded: "card",
      bg: "panelBgSubtle",
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
    },
  },
};

export function StudyImage({
  src,
  alt,
  variant = "default",
  imageProps,
  ...props
}: StudyImageProps) {
  const styles = variantStyles[variant];

  return (
    <Box {...styles.box} {...props}>
      <Image src={src} alt={alt} {...styles.image} {...imageProps} />
    </Box>
  );
}
