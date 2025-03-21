/**
 * @fileoverview Banner promocional estilo Candy Pastel
 * Este componente exibe um banner promocional com tema candy pastel
 * e elementos decorativos suaves para uma experiência visual agradável
 */

import React from "react";

/**
 * Componente de Banner Promocional Candy Pastel
 *
 * Exibe um banner com estilo pastel, bordas arredondadas
 * e elementos decorativos para uma aparência suave e atrativa.
 */
export default function PromocionalBanner() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 dark:from-rose-900/40 dark:via-pink-900/40 dark:to-purple-900/40 py-6 sm:py-8 px-3 sm:px-6 text-center my-6 sm:my-10 rounded-3xl shadow-[0_15px_30px_-15px_rgba(219,39,119,0.3)] dark:shadow-[0_15px_30px_-15px_rgba(219,39,119,0.5)] border border-pink-300/30 dark:border-pink-500/30 hover:shadow-[0_15px_35px_-12px_rgba(219,39,119,0.35)] dark:hover:shadow-[0_15px_35px_-12px_rgba(219,39,119,0.55)] hover:border-pink-300/40 dark:hover:border-pink-500/40 transition-shadow duration-300 animate-fade-in">
          {/* Emojis decorativos */}
          <div className="hidden sm:block absolute w-8 h-8 top-4 left-4 animate-float">
            <div className="w-full h-full rounded-full bg-pink-400 dark:bg-pink-600 flex items-center justify-center text-white text-lg">
              💄
            </div>
          </div>
          <div className="hidden sm:block absolute w-8 h-8 top-4 right-4 animate-float-slow">
            <div className="w-full h-full rounded-full bg-purple-400 dark:bg-purple-600 flex items-center justify-center text-white text-lg">
              🖌️
            </div>
          </div>
          <div className="hidden sm:block absolute w-8 h-8 bottom-4 left-4 animate-float-slow">
            <div className="w-full h-full rounded-full bg-pink-400 dark:bg-pink-600 flex items-center justify-center text-white text-lg">
              🧴
            </div>
          </div>
          <div className="hidden sm:block absolute w-8 h-8 bottom-4 right-4 animate-float">
            <div className="w-full h-full rounded-full bg-purple-400 dark:bg-purple-600 flex items-center justify-center text-white text-lg">
              💅
            </div>
          </div>

          {/* Partículas decorativas */}
          <div className="absolute left-1/4 top-1/3 w-1 h-1 bg-pink-300/70 rounded-full animate-pulse-slow dark:hidden"></div>
          <div className="absolute right-1/4 top-2/3 w-1 h-1 bg-purple-300/70 rounded-full animate-pulse-delay dark:hidden"></div>
          <div className="absolute left-2/3 top-1/3 w-1 h-1 bg-pink-300/70 rounded-full animate-pulse-slow dark:hidden"></div>
          <div className="absolute right-1/3 top-1/2 w-1 h-1 bg-purple-300/70 rounded-full animate-pulse-delay dark:hidden"></div>

          {/* Título */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--primary-color)] dark:text-pink-300 tracking-wider mb-4">
            PROMOÇÃO
          </h2>

          {/* Container do código */}
          <div className="max-w-md mx-auto bg-white/60 dark:bg-gray-800/80 rounded-lg px-4 py-2 mb-4">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-[var(--primary-color)] dark:text-pink-300 font-mono">
                CÓDIGO:
              </span>
              <span className="text-base sm:text-lg font-bold text-[var(--primary-color)] dark:text-pink-300">
                PROMO10
              </span>
            </div>
          </div>

          {/* Informações da promoção */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="bg-pink-400 dark:bg-pink-600 px-4 py-1 rounded-md text-white">
              <span className="text-base sm:text-lg font-medium">10% OFF</span>
            </div>

            <span className="text-sm text-[var(--primary-color)] dark:text-pink-300">
              para pagamentos em
            </span>

            <div className="text-[var(--primary-color)] dark:text-pink-300 font-semibold">
              Dinheiro ou Pix
            </div>
          </div>

          {/* Data limite */}
          <div className="inline-block bg-white/60 dark:bg-gray-800/80 px-3 py-1 rounded-full border border-pink-200 dark:border-pink-500 text-xs text-[var(--primary-color)] dark:text-pink-300">
            <span>VÁLIDO POR TEMPO LIMITADO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
