import Logo from "./logo";
import FlipLink from "@/components/flip-link";
import { ThemeSwitch } from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center gap-5 pb-3 px-4 relative">
        <Logo />
        <div className="hidden lg:flex gap-4">
          <FlipLink href="/">Home</FlipLink>
          <FlipLink href="/about">About</FlipLink>
          <FlipLink href="/projects">Projects</FlipLink>
          <FlipLink href="/skills">Skills</FlipLink>
          <FlipLink href="/contact">Contact</FlipLink>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="text-sm font-light hover:opacity-70 transition-opacity"
          >
            Resume
          </a>
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
