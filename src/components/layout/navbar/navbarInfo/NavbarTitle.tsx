import { StudyText, type StudyTextProps } from "@/components/ui";

export type NavbarTitleProps = Omit<StudyTextProps, "children">;

export function NavbarTitle(props: NavbarTitleProps) {
  return (
    <StudyText
      variant="label"
      fontSize="lg"
      fontWeight="bold"
      color="textMain"
      whiteSpace="nowrap"
      userSelect="none"
      lineHeight="1"
      display={{ base: "none", md: "block" }}
      {...props}
    >
      StudyCentral
    </StudyText>
  );
}