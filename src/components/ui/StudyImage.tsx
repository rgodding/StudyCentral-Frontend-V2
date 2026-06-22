import { Box, Image, type BoxProps, type ImageProps } from "@chakra-ui/react";

export type StudyImageVariant =
  | "default"
  | "icon"
  | "logo"
  | "avatar"
  | "cover"
  | "thumbnail";

export type StudyImageSize = "sm" | "md" | "lg";

export type StudyImageAnimation =
  | "none"
  | "fadeInFast"
  | "scaleInFast";

export type StudyImageProps = Omit<BoxProps, "children" | "size"> & {
  src: string;
  alt: string;
  variant?: StudyImageVariant;
  size?: StudyImageSize;
  animationVariant?: StudyImageAnimation;
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
      borderWidth: "1px",
      borderColor: "borderSubtle",
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
    },
  },

  icon: {
    box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
      userSelect: "none",
    },
    image: {
      objectFit: "contain",
      draggable: false,
    },
  },

  logo: {
    box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
      userSelect: "none",
      rounded: "sm",
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
      rounded: "full",
      overflow: "hidden",
      bg: "panelBgSubtle",
      borderWidth: "1px",
      borderColor: "borderStrong",
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
      borderWidth: "1px",
      borderColor: "borderSubtle",
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
    },
  },

  thumbnail: {
    box: {
      overflow: "hidden",
      rounded: "button",
      bg: "panelBgSubtle",
      borderWidth: "1px",
      borderColor: "borderSubtle",
      flexShrink: 0,
    },
    image: {
      w: "full",
      h: "full",
      objectFit: "cover",
      draggable: false,
    },
  },
};

const sizeStyles: Record<
  StudyImageSize,
  Record<StudyImageVariant, { box: BoxProps; image: ImageProps }>
> = {
  sm: {
    default: {
      box: {
        h: "120px",
      },
      image: {},
    },
    icon: {
      box: {
        boxSize: "28px",
      },
      image: {
        boxSize: "20px",
      },
    },
    logo: {
      box: {
        boxSize: "36px",
      },
      image: {},
    },
    avatar: {
      box: {
        boxSize: "32px",
      },
      image: {},
    },
    cover: {
      box: {},
      image: {},
    },
    thumbnail: {
      box: {
        boxSize: "44px",
      },
      image: {},
    },
  },

  md: {
    default: {
      box: {
        h: "180px",
      },
      image: {},
    },
    icon: {
      box: {
        boxSize: "36px",
      },
      image: {
        boxSize: "28px",
      },
    },
    logo: {
      box: {
        boxSize: "48px",
      },
      image: {},
    },
    avatar: {
      box: {
        boxSize: "40px",
      },
      image: {},
    },
    cover: {
      box: {},
      image: {},
    },
    thumbnail: {
      box: {
        boxSize: "56px",
      },
      image: {},
    },
  },

  lg: {
    default: {
      box: {
        h: "240px",
      },
      image: {},
    },
    icon: {
      box: {
        boxSize: "44px",
      },
      image: {
        boxSize: "34px",
      },
    },
    logo: {
      box: {
        boxSize: "64px",
      },
      image: {},
    },
    avatar: {
      box: {
        boxSize: "56px",
      },
      image: {},
    },
    cover: {
      box: {},
      image: {},
    },
    thumbnail: {
      box: {
        boxSize: "72px",
      },
      image: {},
    },
  },
};

const animationStyles: Record<StudyImageAnimation, BoxProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },
};

export function StudyImage({
  src,
  alt,
  variant = "default",
  size = "md",
  animationVariant = "none",
  imageProps,
  ...props
}: StudyImageProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size][variant];

  return (
    <Box
      {...variantStyle.box}
      {...sizeStyle.box}
      {...animationStyles[animationVariant]}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        {...variantStyle.image}
        {...sizeStyle.image}
        {...imageProps}
      />
    </Box>
  );
}