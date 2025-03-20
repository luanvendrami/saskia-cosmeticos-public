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
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 py-6 sm:py-8 px-3 sm:px-6 text-center my-6 sm:my-10 rounded-3xl shadow-[0_15px_30px_-15px_rgba(219,39,119,0.3)] border border-pink-300/30 hover:shadow-[0_15px_35px_-12px_rgba(219,39,119,0.35)] hover:border-pink-300/40 transition-shadow duration-300 animate-fade-in">
          {/* Elementos decorativos de fundo */}
          <div>
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-r from-pink-300/50 to-purple-300/50 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2 animate-float-slow opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-pink-300/50 to-purple-300/50 rounded-full blur-lg transform translate-x-1/2 translate-y-1/2 animate-float opacity-60"></div>
          </div>

          {/* Emojis decorativos */}
          <div className="hidden sm:block absolute w-8 h-8 top-4 left-4 animate-float">
            <div className="w-full h-full rounded-full bg-pink-400 flex items-center justify-center text-white text-lg">
              💄
            </div>
          </div>
          <div className="hidden sm:block absolute w-8 h-8 top-4 right-4 animate-float-slow">
            <div className="w-full h-full rounded-full bg-purple-400 flex items-center justify-center text-white text-lg">
              🖌️
            </div>
          </div>
          <div className="hidden sm:block absolute w-8 h-8 bottom-4 left-4 animate-float-slow">
            <div className="w-full h-full rounded-full bg-pink-400 flex items-center justify-center text-white text-lg">
              🧴
            </div>
          </div>
          <div className="hidden sm:block absolute w-8 h-8 bottom-4 right-4 animate-float">
            <div className="w-full h-full rounded-full bg-purple-400 flex items-center justify-center text-white text-lg">
              💅
            </div>
          </div>

          {/* Partículas decorativas */}
          <div className="absolute left-1/4 top-1/3 w-1 h-1 bg-pink-300/70 rounded-full animate-pulse-slow"></div>
          <div className="absolute right-1/4 top-2/3 w-1 h-1 bg-purple-300/70 rounded-full animate-pulse-delay"></div>
          <div className="absolute left-2/3 top-1/3 w-1 h-1 bg-pink-300/70 rounded-full animate-pulse-slow"></div>
          <div className="absolute right-1/3 top-1/2 w-1 h-1 bg-purple-300/70 rounded-full animate-pulse-delay"></div>

          {/* Título */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 tracking-wider mb-4">
            PROMOÇÃO
          </h2>

          {/* Container do código */}
          <div className="max-w-md mx-auto bg-white/60 rounded-lg px-4 py-2 mb-4">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-purple-500 font-mono">CÓDIGO:</span>
              <span className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                PROMO10
              </span>
            </div>
          </div>

          {/* Informações da promoção */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="bg-pink-400 px-4 py-1 rounded-md text-white">
              <span className="text-base sm:text-lg font-medium">10% OFF</span>
            </div>

            <span className="text-sm text-purple-700">para pagamentos em</span>

            <div className="text-purple-600 font-semibold">Dinheiro ou Pix</div>
          </div>

          {/* Data limite */}
          <div className="inline-block bg-white/60 px-3 py-1 rounded-full border border-pink-200 text-xs text-purple-700">
            <span>VÁLIDO ATÉ</span>
            <span className="font-bold ml-1">25/12/2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
