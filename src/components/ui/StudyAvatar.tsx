import { Avatar, Icon } from "@chakra-ui/react";
import type { ComponentProps } from "react";
import { LuUserRound } from "react-icons/lu";

type StudyAvatarSize = "sm" | "md" | "lg";
type StudyAvatarShape = "rounded" | "circle";

type StudyAvatarProps = Omit<
  ComponentProps<typeof Avatar.Root>,
  "size" | "shape"
> & {
  fullName?: string;
  src?: string | null;
  size?: StudyAvatarSize;
  shape?: StudyAvatarShape;
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

function hasUsableName(fullName?: string) {
  return Boolean(fullName?.trim());
}

export function StudyAvatar({
  fullName,
  src,
  size = "md",
  shape = "circle",
  ...props
}: StudyAvatarProps) {
  const name = fullName?.trim();
  const shouldUseInitials = hasUsableName(name);

  return (
    <Avatar.Root
      w={sizeMap[size]}
      h={sizeMap[size]}
      rounded={shapeMap[shape]}
      bg="accent"
      color="white"
      overflow="hidden"
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