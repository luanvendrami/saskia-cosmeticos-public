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
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 py-6 sm:py-8 px-3 sm:px-4 md:px-10 text-center my-6 sm:my-10 rounded-3xl shadow-[0_15px_30px_-15px_rgba(219,39,119,0.3)] border border-pink-300/30 hover:shadow-[0_15px_35px_-12px_rgba(219,39,119,0.35)] hover:border-pink-300/40 transition-shadow duration-300 animate-fade-in">
          {/* Elementos decorativos de fundo */}
          <div>
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-r from-pink-300/50 to-purple-300/50 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2 animate-float-slow opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-pink-300/50 to-purple-300/50 rounded-full blur-lg transform translate-x-1/2 translate-y-1/2 animate-float opacity-60"></div>
          </div>

          {/* Container principal */}
          <div className="relative z-10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm bg-white/50 border border-pink-300/30 shadow-xl">
            {/* Elemento decorativo - batom */}
            <div className="absolute w-10 h-10 top-4 left-4 animate-float">
              <div className="w-full h-full rounded-full bg-pink-400 flex items-center justify-center text-white text-xl">
                💄
              </div>
            </div>

            {/* Elemento decorativo - pincel */}
            <div className="absolute w-10 h-10 top-4 right-4 animate-float-slow">
              <div className="w-full h-full rounded-full bg-purple-400 flex items-center justify-center text-white text-xl">
                🖌️
              </div>
            </div>

            {/* Elemento decorativo - perfume */}
            <div className="absolute w-10 h-10 bottom-4 left-4 animate-float-slow">
              <div className="w-full h-full rounded-full bg-pink-400 flex items-center justify-center text-white text-xl">
                🧴
              </div>
            </div>

            {/* Elemento decorativo - esmalte */}
            <div className="absolute w-10 h-10 bottom-4 right-4 animate-float">
              <div className="w-full h-full rounded-full bg-purple-400 flex items-center justify-center text-white text-xl">
                💅
              </div>
            </div>

            {/* Partículas decorativas */}
            <div className="absolute left-1/4 top-1/3 w-1 sm:w-2 h-1 sm:h-2 bg-pink-300/70 rounded-full animate-pulse-slow"></div>
            <div className="absolute right-1/4 top-2/3 w-1 sm:w-2 h-1 sm:h-2 bg-purple-300/70 rounded-full animate-pulse-delay"></div>
            <div className="absolute left-2/3 top-1/3 w-1 sm:w-2 h-1 sm:h-2 bg-pink-300/70 rounded-full animate-pulse-slow"></div>
            <div className="absolute right-1/3 top-1/2 w-1 h-1 bg-purple-300/70 rounded-full animate-pulse-delay"></div>

            {/* Conteúdo central */}
            <div className="relative z-20 flex flex-col items-center justify-center py-3 sm:py-4 space-y-3 sm:space-y-4">
              {/* Título */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 tracking-wider animate-pulse-text px-2">
                PROMOÇÃO
              </h2>

              {/* Container do cupom */}
              <div className="mt-2 sm:mt-3 group">
                <div className="relative px-4 sm:px-5 py-1.5 sm:py-2 bg-white/60 rounded-lg border border-pink-300/40 backdrop-blur-sm shadow-sm overflow-hidden transition-shadow duration-300 group-hover:shadow-md">
                  {/* Código do cupom */}
                  <div className="relative z-10 flex items-center justify-center space-x-1">
                    <span className="text-xs text-purple-500 font-mono">
                      CÓDIGO:
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                      PROMO10
                    </span>
                  </div>
                </div>
              </div>

              {/* Descrição do desconto */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-2 sm:mt-3">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-2 sm:px-3 py-1 rounded-md shadow-sm text-white animate-pulse-slow">
                  <span className="text-base sm:text-lg">10% OFF</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm sm:text-base text-purple-700 font-medium">
                    para pagamentos em
                  </span>
                  <div className="flex items-center ml-1">
                    <span className="text-sm sm:text-base text-purple-500 font-bold mr-1">
                      Dinheiro
                    </span>
                    <span className="text-purple-700 mx-1">ou</span>
                    <span className="text-sm sm:text-base text-purple-500 font-bold">
                      Pix
                    </span>
                  </div>
                </div>
              </div>

              {/* Data limite */}
              <div className="mt-1 sm:mt-2 flex items-center gap-1 bg-white/60 px-3 sm:px-4 py-1 rounded-full backdrop-blur-sm border border-pink-200 text-xs text-purple-700">
                <span>VÁLIDO ATÉ</span>
                <span className="font-bold">25/12/2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
