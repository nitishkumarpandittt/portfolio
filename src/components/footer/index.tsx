import FooterNav from "./footer-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { config } from "@/config";

const Footer = () => {
  return (
    <div className="flex flex-col items-center lg:items-start p-16 pb-12 gap-8 lg:gap-16 rounded-xl font-light relative flex-1 bg-primary text-white dark:text-black">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* AVATAR  */}
        <Avatar className="size-[60px]">
          <AvatarImage src={config.developer.avatar} alt="avatar" sizes="60px" />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>

        {/* NAME  */}
        <div className="flex flex-col items-center lg:items-start gap-[2px]">
          <h1 className="text-xl sm:text-2xl whitespace-nowrap">Nitish Kumar Pandit</h1>
          <p className="text-sm opacity-60">Software Engineer</p>
        </div>
      </div>
      <div className="grid lg:w-full grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-14">
        <FooterNav
          title="Pages"
          links={[
            { title: "Home", href: "/" },
            { title: "About", href: "/about" },
            { title: "Projects", href: "/projects" },
            { title: "Skills", href: "/skills" },
            { title: "Contact", href: "/contact" },
          ]}
        />
      </div>

      {/* Attribution */}
      <div className="text-xs md:text-sm text-center md:text-left">
        <p className="whitespace-nowrap">
          <span className="opacity-60">© 2026. Thanks for visiting </span>
          <a
            href={`https://github.com/${config.social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Nitish Kumar Pandit
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
