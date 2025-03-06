"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import Navbar from "../navbar";
import { useState } from "react";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={`${styles.header_container} relative z-50 w-full mx-auto max-w-[1920px]`}>
        <div className={styles.text_container}>
          <div className={styles.text_internal_container}>
          <div className={`${styles.text_div} hidden md:block`}>
              <Link href="/">Saskia Cosméticos</Link>
            </div>
          </div>
        </div>

        {/* Navbar passa o estado do menu aberto */}
        <Navbar setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* Fundo de Blur que cobre apenas abaixo do Header */}
      {isMenuOpen && (
        <div className="fixed top-[8rem] left-0 w-full h-[calc(100vh-8rem)] bg-black/70 backdrop-blur-lg z-10"></div>
      )}
    </>
  );
}
