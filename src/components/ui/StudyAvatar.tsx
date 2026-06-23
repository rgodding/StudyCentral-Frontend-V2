import { Avatar, Icon } from "@chakra-ui/react";
import type { ComponentProps } from "react";
import { LuUserRound } from "react-icons/lu";

export type StudyAvatarSize = "sm" | "md" | "lg";
export type StudyAvatarShape = "rounded" | "circle";
export type StudyAvatarVariant =
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "danger";

export type StudyAvatarProps = Omit<
  ComponentProps<typeof Avatar.Root>,
  "size" | "shape" | "color"
> & {
  name?: string;
  src?: string | null;
  size?: StudyAvatarSize;
  shape?: StudyAvatarShape;
  avatarVariant?: StudyAvatarVariant;
};

const sizeMap: Record<StudyAvatarSize, string> = {
  sm: "avatarSm",
  md: "avatarMd",
  lg: "avatarLg",
};

const iconSizeMap: Record<StudyAvatarSize, string> = {
  sm: "18px",
  md: "22px",
  lg: "28px",
};

const shapeMap: Record<StudyAvatarShape, string> = {
  rounded: "md",
  circle: "full",
};

const variantStyles: Record<
  StudyAvatarVariant,
  Pick<ComponentProps<typeof Avatar.Root>, "bg" | "color" | "borderColor">
> = {
  accent: {
    bg: "accent",
    color: "white",
    borderColor: "accent",
  },

  neutral: {
    bg: "panelBgSubtle",
    color: "textMain",
    borderColor: "borderStrong",
  },

  success: {
    bg: "green.100",
    color: "successText",
    borderColor: "green.200",
  },

  warning: {
    bg: "yellow.100",
    color: "warningText",
    borderColor: "yellow.200",
  },

  danger: {
    bg: "red.100",
    color: "dangerText",
    borderColor: "red.200",
  },
};

function hasUsableName(name?: string) {
  return Boolean(name?.trim());
}

export function StudyAvatar({
  name,
  src,
  size = "md",
  shape = "circle",
  avatarVariant = "accent",
  ...props
}: StudyAvatarProps) {
  const trimmedName = name?.trim();
  const shouldUseInitials = hasUsableName(trimmedName);

  return (
    <Avatar.Root
      w={sizeMap[size]}
      h={sizeMap[size]}
      rounded={shapeMap[shape]}
      overflow="hidden"
      borderWidth="1px"
      {...variantStyles[avatarVariant]}
      {...props}
    >
      {shouldUseInitials ? (
        <Avatar.Fallback name={name} />
      ) : (
        <Avatar.Fallback>
          <Icon as={LuUserRound} boxSize={iconSizeMap[size]} />
        </Avatar.Fallback>
      )}

      {src && <Avatar.Image src={src} alt={name ?? "User avatar"} />}
    </Avatar.Root>
  );
}