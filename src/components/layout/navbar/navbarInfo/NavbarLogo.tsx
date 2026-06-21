import { StudyImage, type StudyImageProps } from "@/components/ui";

type NavbarLogoProps = Omit<StudyImageProps, "src" | "alt" | "variant">;

export function NavbarLogo(props: NavbarLogoProps) {
  return (
    <StudyImage
      src="/logo.png"
      alt="StudyCentral logo"
      variant="logo"
      {...props}
    />
  );
}