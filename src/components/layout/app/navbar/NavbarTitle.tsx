import { StudyText, type StudyTextProps } from "@/components/ui";

type NavbarTitleProps = Omit<StudyTextProps, "children">;

export function NavbarTitle(props: NavbarTitleProps) {
  return (
    <StudyText
      variant="label"
      fontSize="xl"
      fontWeight="bold"
      color="textMain"
      whiteSpace="nowrap"
      userSelect="none"
      lineHeight="1"
      {...props}
    >
      StudyCentral
    </StudyText>
  );
}