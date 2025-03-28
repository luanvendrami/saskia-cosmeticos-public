"use client";

import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";

const categorias = [
  { name: "Cabelos", href: "/cabelos" },
  { name: "Skin Care", href: "/skincare" },
  { name: "Maquiagem", href: "/maquiagem" },
  { name: "Perfumes", href: "/perfumes" },
  { name: "Corpo", href: "/corpo" },
];

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 mt-auto">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-left">
              Saskia Cosméticos
            </h4>
            <ul className="space-y-3 w-full">
              <li className="flex items-center justify-center md:justify-start">
                <FiMapPin
                  className="text-[#ff69b4] mr-2 flex-shrink-0"
                  suppressHydrationWarning
                />
                <span className="text-sm text-center md:text-left">
                  Rua Luigui Sardagna, 100, Rodeio, SC
                </span>
              </li>
              <li className="flex flex-col items-center md:items-start">
                <div className="flex items-center">
                  <FiClock
                    className="text-[#ff69b4] mr-2 flex-shrink-0"
                    suppressHydrationWarning
                  />
                  <span>Seg-Sex: 11h - 18:30h</span>
                </div>
                <span className="ml-6 md:ml-6">Sab: 08h - 12h</span>
              </li>
            </ul>
            <div className="mt-6 flex justify-center md:justify-start space-x-4 w-full">
              <a
                href="https://www.instagram.com/saskiacosmeticos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#ff69b4] transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} suppressHydrationWarning />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#ff69b4] transition-colors"
                aria-label="WhatsApp"
              >
                <FiPhone size={20} suppressHydrationWarning />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Categorias
            </h4>
            <ul className="space-y-2 w-full flex flex-col items-center">
              {categorias.map((categoria) => (
                <li key={categoria.name}>
                  <Link
                    href={categoria.href}
                    className="hover:text-[#ff69b4] transition-colors"
                  >
                    {categoria.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="text-sm text-gray-500 text-center">
          <p>
            &copy; {new Date().getFullYear()} Saskia Cosméticos. Todos os
            direitos reservados.
          </p>
          <p className="mt-2">
            <a
              href="https://www.linkedin.com/in/luan-vendrami"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium hover:text-[#ff69b4] transition-colors"
            >
              Desenvolvido por Luan Vendrami{" "}
              <FiLinkedin
                className="ml-1 text-blue-600"
                size={18}
                suppressHydrationWarning
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
