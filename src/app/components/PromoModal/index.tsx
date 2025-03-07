"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiStar, FiGift } from 'react-icons/fi';

/**
 * Componente que exibe um modal promocional
 * 
 * Mostra uma oferta especial com cupom de desconto para o usuário
 * Aparece uma vez por sessão para novos visitantes
 */
export default function ModalPromocional() {
  const [visivel, setVisivel] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    // Marcando que o componente foi montado no cliente
    setMontado(true);
    
    try {
      // Verificar se é a primeira visita (usando localStorage)
      const jaViuPromocao = localStorage.getItem('hasSeenPromo');
      
      if (!jaViuPromocao) {
        // Se for a primeira visita, mostrar o modal após um pequeno delay
        const timer = setTimeout(() => {
          setVisivel(true);
          // Registrar que o usuário já viu a promoção
          localStorage.setItem('hasSeenPromo', 'true');
          
          // Definir um tempo para expirar (24 horas)
          const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
          localStorage.setItem('promoExpiration', expirationTime.toString());
        }, 3000); // 3 segundos de atraso
        
        return () => clearTimeout(timer);
      } else {
        // Verificar se o tempo expirou
        const expirationTime = localStorage.getItem('promoExpiration');
        
        if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
          // Reset se o tempo expirou
          resetarPromocao();
        }
      }
    } catch (error) {
      // Tratamento para caso o localStorage não esteja disponível (ex: navegação privada)
      console.error('Erro ao acessar localStorage', error);
    }
  }, []);

  /**
   * Fecha o modal promocional
   */
  const fecharModal = () => {
    setVisivel(false);
  };

  /**
   * Reseta o estado da promoção, permitindo que ela seja exibida novamente
   */
  const resetarPromocao = () => {
    try {
      localStorage.removeItem('hasSeenPromo');
      localStorage.removeItem('promoExpiration');
    } catch (error) {
      console.error('Erro ao resetar promoção', error);
    }
  };

  // Não renderizar nada durante a renderização do servidor ou se o componente não estiver montado
  if (!montado) return null;
  
  // Não renderizar se o modal não estiver visível
  if (!visivel) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0">
      {/* Overlay com blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={fecharModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl animate-modal-slide-in">
        {/* Elementos decorativos */}
        <div className="absolute -left-6 -top-6 w-20 h-20 bg-pink-500 rounded-full opacity-20"></div>
        <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-purple-500 rounded-full opacity-20"></div>
        
        {/* Banner "10% OFF" */}
        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 text-white py-1 px-4 transform rotate-12 translate-x-2 -translate-y-2 rounded-sm text-sm font-bold shadow-lg">
          10% OFF
        </div>

        {/* Botão de fechar */}
        <button 
          onClick={fecharModal}
          className="absolute right-3 top-3 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
          aria-label="Fechar modal promocional"
        >
          <FiX className="w-6 h-6 text-gray-700" />
        </button>

        {/* Conteúdo do modal */}
        <div className="flex flex-col md:flex-row">
          {/* Imagem (ocupa 100% em mobile, 50% em desktop) */}
          <div className="relative w-full md:w-1/2 h-52 md:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1597586124394-fbd6ef244026?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Mulher surpresa com oferta promocional"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Overlay gradiente na imagem */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r"></div>
            
            {/* Texto sobreposto na imagem apenas em mobile */}
            <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
              <div className="flex items-center mb-1">
                <FiStar className="text-yellow-300 mr-1" />
                <span className="text-xs font-bold tracking-wider">OFERTA EXCLUSIVA</span>
              </div>
              <h3 className="text-xl font-extrabold drop-shadow-md">
                10% OFF EM TUDO!
              </h3>
            </div>
          </div>

          {/* Texto promocional */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col justify-center">
            {/* Tag de oferta - visível apenas no desktop */}
            <div className="hidden md:block bg-[#ff69b4]/10 rounded-full py-1 px-3 inline-flex items-center mb-3 self-start">
              <FiStar className="text-[#ff69b4] mr-1" />
              <span className="text-sm font-semibold text-[#ff69b4]">OFERTA ESPECIAL</span>
            </div>
            
            {/* Título - visível apenas no desktop */}
            <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              GANHE 10% OFF EM TODO O SITE!
            </h2>
            
            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6">
              Estamos super animados para oferecer esta promoção especial para
              novos clientes! Use o cupom abaixo em sua primeira compra e ganhe 10% de desconto em qualquer produto.
            </p>
            
            {/* Código do cupom */}
            <div className="bg-[#ff69b4] text-2xl md:text-3xl font-bold text-white py-2 px-4 rounded-lg mx-auto md:mx-0 transform rotate-2 shadow-lg animate-pulse-shadow">
              PROMO10
            </div>
            
            <p className="mt-4 text-xs text-gray-500">
              *Use o cupom acima no carrinho de compras. Válido até o fim do mês.
            </p>
          </div>
        </div>

        {/* Botão para aproveitar a promoção */}
        <button
          onClick={fecharModal}
          className="w-full py-4 bg-[#ff69b4] hover:bg-[#ff1493] text-white text-lg font-bold transition-colors duration-300 flex items-center justify-center"
        >
          <FiGift className="mr-2" />
          APROVEITAR AGORA!
        </button>
        
        {/* Botão para resetar o modal (apenas durante o desenvolvimento) */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={resetarPromocao}
            className="absolute left-3 top-3 z-10 bg-gray-100 text-xs text-gray-500 rounded p-1 opacity-50 hover:opacity-100"
          >
            Reset (dev)
          </button>
        )}
      </div>
    </div>
  );
} 