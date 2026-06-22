import { Separator, type SeparatorProps } from "@chakra-ui/react";

export type StudyDividerVariant = "subtle" | "strong" | "accent" | "danger";
export type StudyDividerOrientation = "horizontal" | "vertical";

export type StudyDividerProps = Omit<
  SeparatorProps,
  "variant" | "orientation"
> & {
  variant?: StudyDividerVariant;
  orientation?: StudyDividerOrientation;
};

const variantStyles: Record<StudyDividerVariant, SeparatorProps> = {
  subtle: {
    borderColor: "borderSubtle",
  },

  strong: {
    borderColor: "borderStrong",
  },

  accent: {
    borderColor: "accent",
  },

  danger: {
    borderColor: "dangerText",
  },
};

const orientationStyles: Record<StudyDividerOrientation, SeparatorProps> = {
  horizontal: {
    orientation: "horizontal",
    w: "full",
  },

  vertical: {
    orientation: "vertical",
    h: "full",
    minH: "24px",
  },
};

export function StudyDivider({
  variant = "subtle",
  orientation = "horizontal",
  ...props
}: StudyDividerProps) {
  return (
    <Separator
      {...orientationStyles[orientation]}
      {...variantStyles[variant]}
      {...props}
    />
  );
}