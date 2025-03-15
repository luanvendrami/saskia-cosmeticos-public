"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import Cart from "../cart";
import Navbar from "../navbar";
import "../../styles/elegant-title.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Only apply scroll behavior on mobile
    if (!isMobile) {
      setIsHeaderVisible(true);
      return;
    }

    const handleScroll = () => {
      // Don't hide header when menu is open
      if (isMenuOpen) {
        setIsHeaderVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Always show header at the top of the page
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, lastScrollY, isMenuOpen]);

  // Always show header when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      setIsHeaderVisible(true);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Style classes for the header based on visibility
  const headerClasses = `fixed top-0 left-0 right-0 z-50 w-full mx-auto max-w-[1920px] bg-[#ffe1ff] shadow-md transition-transform duration-300 ${
    isHeaderVisible || isMenuOpen ? "transform-none" : "-translate-y-full"
  }`;

  return (
    <>
      <div
        className="w-full"
        style={{ height: isMobile ? "61px" : "auto" }}
      ></div>
      <header ref={headerRef} className={headerClasses}>
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
            <div className="no-underline-wrapper">
              <Link
                href="/"
                className="elegant-title-container"
                style={{ textDecoration: "none" }}
              >
                <div className="elegant-title-wrapper">
                  <div className="elegant-title">
                    <Image
                      src="/svg/lipstick.png"
                      alt="Lipstick icon"
                      width={28}
                      height={28}
                      className="makeup-icon-img"
                    />
                    <div className="title-container">
                      <span className="title-text-main">Saskia</span>
                      <span className="title-text-secondary">Cosméticos</span>
                    </div>
                  </div>
                  <div className="elegant-glow"></div>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-1 sm:gap-3">
            <Cart />
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
