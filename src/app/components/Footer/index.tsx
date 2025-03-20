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
} from "react-icons/fi";

/**
 * Categorias para navegação do rodapé
 */
const categorias = [
  { name: "Cabelos", href: "/cabelos" },
  { name: "Skin Care", href: "/skincare" },
  { name: "Maquiagem", href: "/maquiagem" },
  { name: "Perfumes", href: "/perfumes" },
  { name: "Corpo", href: "/corpo" },
];

/**
 * Links de atendimento ao cliente
 */
const linksAtendimento = [
  { name: "Perguntas Frequentes", href: "#" },
  { name: "Envio e Devoluções", href: "#" },
  { name: "Termos e Condições", href: "#" },
  { name: "Política de Privacidade", href: "#" },
  { name: "Fale Conosco", href: "#" },
];

/**
 * Componente de Rodapé
 *
 * Exibe informações de contato, navegação por categorias
 * e links úteis para atendimento ao cliente
 */
export default function Rodape() {
  return (
    <footer className="bg-white text-gray-600">
      {/* Conteúdo Principal do Rodapé */}
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informações da Empresa */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-left">
              Saskia Cosméticos
            </h4>
            <ul className="space-y-3 w-full">
              <li className="flex items-center justify-center md:justify-start">
                <FiMapPin className="text-[#ff69b4] mr-2 flex-shrink-0" />
                <span className="text-sm">
                  Av. da Beleza, 123, São Paulo, Brasil
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FiPhone className="text-[#ff69b4] mr-2 flex-shrink-0" />
                <span>+55 (11) 1234-5678</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FiMail className="text-[#ff69b4] mr-2 flex-shrink-0" />
                <span>contato@saskiacosmeticos.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FiClock className="text-[#ff69b4] mr-2 flex-shrink-0" />
                <span>Seg-Sex: 9h - 18h</span>
              </li>
            </ul>

            {/* Mídias Sociais */}
            <div className="mt-6 flex justify-center md:justify-start space-x-4 w-full">
              <a
                href="#"
                className="text-gray-500 hover:text-[#ff69b4] transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#ff69b4] transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#ff69b4] transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#ff69b4] transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Categorias */}
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

        {/* Divisor */}
        <hr className="my-8 border-gray-200" />

        {/* Direitos Autorais */}
        <div className="text-sm text-gray-500 text-center">
          <p>
            &copy; {new Date().getFullYear()} Saskia Cosméticos. Todos os
            direitos reservados.
          </p>
          <p className="mt-1">Desenvolvido com ❤️ para amantes da beleza</p>
        </div>
      </div>
    </footer>
  );
}
