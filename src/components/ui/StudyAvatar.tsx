import { Avatar } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type StudyAvatarSize = "sm" | "md" | "lg";
type StudyAvatarShape = "rounded" | "circle";

type StudyAvatarProps = Omit<
  ComponentProps<typeof Avatar.Root>,
  "size" | "shape"
> & {
  name?: string;
  src?: string | null;
  size?: StudyAvatarSize;
  shape?: StudyAvatarShape;
};

const sizeMap: Record<StudyAvatarSize, string> = {
  sm: "avatarSm",
  md: "avatarMd",
  lg: "avatarLg",
};

const shapeMap: Record<StudyAvatarShape, string> = {
  rounded: "md",
  circle: "full",
};

export function StudyAvatar({
  name,
  src,
  size = "md",
  shape = "circle",
  ...props
}: StudyAvatarProps) {
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
      <Avatar.Fallback name={name} />
      {src && <Avatar.Image src={src} alt={name ?? "User avatar"} />}
    </Avatar.Root>
  );
}