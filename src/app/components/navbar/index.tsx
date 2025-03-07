"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
  { href: "/corpo", label: "Corpo" }
];

export default function Navbar({ setIsMenuOpen, isMenuOpen, toggleMenu }: NavbarProps) {
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

  const renderMenuItem = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className="text-[#ff69b4] hover:text-[#ff1493] transition-colors duration-300"
      onClick={isMobile ? toggleMenu : undefined}
    >
      {label}
    </Link>
  );

  const renderMobileMenu = () => (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
      <div className="fixed top-0 left-0 h-full w-72 bg-[#ffe1ff] shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-pink-200">
            <Link href="/" className="text-xl font-bold text-[#ff69b4]" onClick={toggleMenu}>
              Saskia Cosméticos
            </Link>
            <button
              className="p-2 rounded-full hover:bg-pink-100 transition-colors"
              onClick={toggleMenu}
            >
              <X className="w-6 h-6 text-[#ff69b4]" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-4">
              {MENU_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center py-2 text-lg font-medium text-[#ff69b4] hover:text-[#ff1493] hover:bg-pink-50 rounded-lg px-4 transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-pink-200">
            <p className="text-sm text-[#ff69b4] text-center">
              © 2024 Saskia Cosméticos
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="menu-container relative">
      <div className="hidden md:block">
        <div className="flex items-center justify-between px-4 py-3 bg-[#ffe1ff] shadow-md relative z-20">
          <nav className="flex items-center justify-center gap-8 w-full">
            {MENU_ITEMS.map(({ href, label }) => renderMenuItem(href, label))}
          </nav>
        </div>
      </div>

      {isMobile && isMenuOpen && renderMobileMenu()}
    </div>
  );
}
