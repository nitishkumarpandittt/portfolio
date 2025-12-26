"use client";

import Graphic from "../../../../../components/graphic";
import MobileMenuButton from "./mobile-menu-button";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-3 z-50 bg-background rounded-br-[18px]">
      <div className="relative">
        <Navbar />
        {/* MOBILE TOP BAR  */}
        <div className="border-t-12 fixed top-0 left-0 w-full border-background block lg:hidden"></div>

        <div className={`absolute left-0 size-[18px] ${isHome ? "-bottom-3" : "-bottom-[18px]"}`}>
          <Graphic />
        </div>
        <div className={`absolute -right-[18px] size-[18px] ${isHome ? "top-3" : "top-0"}`}>
          <Graphic />
        </div>
      </div>

      <MobileMenuButton />
    </header>
  );
};

export default Header;
