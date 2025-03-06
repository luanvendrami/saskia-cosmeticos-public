"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import styles from "./styles.module.css";

interface NavbarProps {
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ setIsMenuOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se a tela é pequena (mobile)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMenuOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const targetElement = event.target as HTMLElement;

      if (isOpen && !targetElement.closest(".menu-container")) {
        setIsOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="menu-container relative">
      {/* Navbar principal */}
      <div className="flex items-center justify-center gap-10 px-6 py-3 bg-[#faeddf] shadow-md relative z-20">
        <div className="text-lg text-black font-sans md:hidden relative z-10">
          <Link href="/">Saskia Cosméticos</Link>
        </div>

        {/* Ícone do Menu */}
        <div
          className={`md:relative ${isMobile ? "absolute left-0 top-0" : ""}`}
        >
          <button
            className="p-2 flex items-center justify-center"
            onClick={toggleMenu}
          >
            <Menu size={28} className="text-gray-800 hover:text-gray-500" />
          </button>
        </div>

        {!isMobile && (
          <nav className="flex items-center justify-center gap-6">
            <Link
              href="/perfumes"
              className="text-gray-800 hover:text-gray-500"
            >
              Perfumes
            </Link>
            <Link
              href="/skincare"
              className="text-gray-800 hover:text-gray-500"
            >
              Skincare
            </Link>
            <Link
              href="/maquiagem"
              className="text-gray-800 hover:text-gray-500"
            >
              Maquiagem
            </Link>
            <Link href="/cabelos" className="text-gray-800 hover:text-gray-500">
              Cabelos
            </Link>
          </nav>
        )}
      </div>

      {/* Menu lateral para mobile */}
      {isMobile && isOpen && (
        <>
          {/* Fundo Blur apenas para mobile */}
          <div className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-lg z-40"></div>

          {/* Navbar lateral */}
          <div
            className={`fixed top-0 left-0 w-[250px] h-full bg-[#faeddf] shadow-lg p-6 transition-all duration-300 ease-in-out transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } z-50 rounded-l-lg backdrop-blur-lg bg-opacity-80`}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-200"
              onClick={toggleMenu}
            >
              <X size={28} className="text-gray-800 hover:text-gray-500" />
            </button>
            <ul className="flex flex-col space-y-6 mt-12">
              <li>
                <Link
                  href="/perfumes"
                  className="text-lg font-semibold text-gray-800 hover:text-gray-500 transition duration-200"
                  onClick={toggleMenu}
                >
                  Perfumes
                </Link>
              </li>
              <li>
                <Link
                  href="/dermocosmeticos"
                  className="text-lg font-semibold text-gray-800 hover:text-gray-500 transition duration-200"
                  onClick={toggleMenu}
                >
                  Dermocosméticos
                </Link>
              </li>
              <li>
                <Link
                  href="/cabelos"
                  className="text-lg font-semibold text-gray-800 hover:text-gray-500 transition duration-200"
                  onClick={toggleMenu}
                >
                  Cabelos
                </Link>
              </li>
              <li>
                <Link
                  href="/maquiagem"
                  className="text-lg font-semibold text-gray-800 hover:text-gray-500 transition duration-200"
                  onClick={toggleMenu}
                >
                  Maquiagem
                </Link>
              </li>
              <li>
                <Link
                  href="/tratamentos"
                  className="text-lg font-semibold text-gray-800 hover:text-gray-500 transition duration-200"
                  onClick={toggleMenu}
                >
                  Tratamentos
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Dropdown no Desktop */}
      {!isMobile && isOpen && (
        <div className="fixed top-35 left-5 right-5 bg-[#faeddf] text-gray-800 p-6 shadow-lg border-t border-gray-200 rounded-lg">
          <span className="text-lg font-semibold block mb-2 px-6">Menu</span>
          <ul className="flex justify-center space-x-10 px-6">
            <li>
              <Link href="/perfumes" className="hover:text-gray-500">
                Perfumes
              </Link>
            </li>
            <li>
              <Link href="/dermocosmeticos" className="hover:text-gray-500">
                Dermocosméticos
              </Link>
            </li>
            <li>
              <Link href="/cabelos" className="hover:text-gray-500">
                Cabelos
              </Link>
            </li>
            <li>
              <Link href="/maquiagem" className="hover:text-gray-500">
                Maquiagem
              </Link>
            </li>
            <li>
              <Link href="/tratamentos" className="hover:text-gray-500">
                Tratamentos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
