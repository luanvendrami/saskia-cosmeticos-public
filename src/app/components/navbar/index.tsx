"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MOBILE_BREAKPOINT = 768;
const MENU_ITEMS = [
  { href: "/cabelos", label: "Cabelos" },
  { href: "/skincare", label: "Skincare" },
  { href: "/maquiagem", label: "Maquiagem" },
  { href: "/perfumes", label: "Perfumes" },
  { href: "/corpo", label: "Corpo" },
];

export default function Navbar({
  setIsMenuOpen,
  isMenuOpen,
  toggleMenu,
}: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (isMenuOpen && !targetElement?.closest(".menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, setIsMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobile]);

  const renderMenuItem = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className="px-4 py-2 text-[var(--primary-color)] bg-opacity-20 bg-[var(--secondary-light)] hover:bg-opacity-30  hover:text-[var(--secondary-dark)] rounded-md font-medium transition-all duration-300 shadow-sm"
      onClick={isMobile ? toggleMenu : undefined}
    >
      {label}
    </Link>
  );

  const renderMobileMenu = () => (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
      <div className="fixed top-0 left-0 h-full w-72 bg-[var(--primary-light)] shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-opacity-20 border-[var(--primary-color)]">
            <Link
              href="/"
              className="text-xl font-bold text-[var(--primary-color)]"
              onClick={toggleMenu}
            >
              Saskia Cosméticos
            </Link>
            <button
              className="p-2 rounded-full outline-none focus:outline-none active:outline-none active:bg-transparent hover:text-[var(--primary-color)]"
              onClick={toggleMenu}
              style={{
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
              }}
            >
              <X className="w-6 h-6 text-[var(--primary-color)]" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-4">
              {MENU_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center py-3 text-lg font-medium text-[var(--primary-color)] bg-opacity-10 bg-[var(--secondary-light)] hover:bg-opacity-20 hover:text-[var(--primary-dark)] rounded-lg px-5 transition-all duration-200 shadow-sm w-full"
                    onClick={toggleMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-opacity-20 border-[var(--primary-color)]">
            <p className="text-sm text-[var(--primary-color)] text-center">
              © {new Date().getFullYear()} Saskia Cosméticos
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="menu-container relative">
      <div className="hidden md:block">
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--primary-light)] shadow-md relative z-20">
          <nav className="flex items-center justify-center gap-6 w-full">
            {MENU_ITEMS.map(({ href, label }) => renderMenuItem(href, label))}
          </nav>
        </div>
      </div>

      {isMobile && isMenuOpen && renderMobileMenu()}
    </div>
  );
}
