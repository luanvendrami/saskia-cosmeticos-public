"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import CarrinhoCompras from "../carrinhocompras/index";
import Navbar from "../navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="relative z-50 w-full mx-auto max-w-[1920px] bg-[#ffe1ff] shadow-md">
        <div className="w-full px-4 py-3 flex items-center justify-center">
          <div className="flex-1 flex justify-start items-center">
            {isMobile && (
              <button
                className="p-2 rounded-lg hover:bg-pink-100 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-[#ff69b4]" />
              </button>
            )}
          </div>

          <div className="flex-1 flex justify-center items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-[#ff69b4] hover:text-[#ff1493] transition-colors duration-300"
            >
              Saskia Cosméticos
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center gap-1 sm:gap-3">
            <CarrinhoCompras />
          </div>
        </div>

        <Navbar
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </header>
    </>
  );
}
