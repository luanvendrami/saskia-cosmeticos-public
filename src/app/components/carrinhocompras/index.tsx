"use client";

import { useRef, useEffect, useState } from 'react';
import { FiX, FiShoppingCart, FiTag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { CartService } from '../../services';
import CartItem from '../cartItem';

/**
 * Componente de Carrinho de Compras
 * 
 * Exibe os produtos adicionados, permite gerenciar quantidades
 * e finalizar o pedido via WhatsApp
 */
export default function Carrinho() {
  const cartRef = useRef<HTMLDivElement>(null);
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    cartTotal,
    cartCount
  } = useCart();
  
  const [codigoCupom, setCodigoCupom] = useState("");
  const [erroCupom, setErroCupom] = useState("");
  const [descontoAplicado, setDescontoAplicado] = useState(0);

  useEffect(() => {
    /**
     * Manipula o clique fora do carrinho para fechá-lo
     * 
     * @param event - Evento de mouse
     */
    function manipularCliqueExterno(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    }

    // Adiciona listener de evento ao documento quando o carrinho estiver aberto
    if (isCartOpen) {
      document.addEventListener('mousedown', manipularCliqueExterno);
    }

    // Remove o listener quando o componente for desmontado ou o carrinho fechar
    return () => {
      document.removeEventListener('mousedown', manipularCliqueExterno);
    };
  }, [isCartOpen, toggleCart]);

  /**
   * Valida e aplica o cupom de desconto ao carrinho
   */
  const aplicarCupom = () => {
    if (!codigoCupom) {
      setErroCupom("Por favor, insira um código de cupom.");
      return;
    }
    
    // Lista de cupons válidos com seus percentuais de desconto
    const cuponsValidos: { [key: string]: number } = {
      "PROMO10": 10
    };
    
    // Verificar se o cupom é válido
    if (cuponsValidos[codigoCupom.toUpperCase()]) {
      const percentualDesconto = cuponsValidos[codigoCupom.toUpperCase()];
      const valorDesconto = cartTotal * (percentualDesconto / 100);
      
      setDescontoAplicado(valorDesconto);
      setErroCupom("");
    } else {
      setErroCupom("Cupom inválido ou expirado.");
    }
  };

  /**
   * Finaliza a compra abrindo o WhatsApp com o pedido
   */
  const finalizarCompra = () => {
    if (cartItems.length === 0) return;
    
    // Use CartService to handle checkout
    CartService.checkoutViaWhatsApp(cartItems, cartTotal, descontoAplicado);
    
    // Optionally close cart after checkout initiated
    // toggleCart();
  };

  // Calcula o total após desconto
  const totalComDesconto = cartTotal - descontoAplicado;

  return (
    <>
      {/* Botão do carrinho no header */}
      <button 
        onClick={toggleCart}
        className="relative p-2 rounded-lg text-[#ff69b4] hover:bg-pink-100 transition-colors"
        aria-label="Abrir carrinho"
      >
        <FiShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff69b4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Modal do carrinho - só exibe quando aberto */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Fundo escurecido */}
          <div 
            className="absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity" 
            onClick={toggleCart}
          />

          {/* Carrinho */}
          <div 
            ref={cartRef}
            className="relative w-full max-w-md bg-white h-full shadow-xl overflow-hidden transform transition-transform animate-slide-in-right"
          >
            <div className="flex flex-col h-full">
              {/* Cabeçalho */}
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-pink-50 to-white">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FiShoppingCart className="mr-2 text-[#ff69b4]" />
                  Seu Carrinho 
                  {cartCount > 0 && (
                    <span className="ml-2 bg-[#ff69b4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </h2>
                <button 
                  onClick={toggleCart}
                  className="rounded-md bg-white p-2 hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 overflow-auto divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                      <FiShoppingCart className="w-12 h-12 text-[#ff69b4]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Seu carrinho está vazio</h3>
                    <p className="text-gray-500 max-w-xs">
                      Adicione produtos ao seu carrinho para continuar com a compra.
                    </p>
                  </div>
                )}
              </div>

              {/* Rodapé com total e checkout */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-white to-pink-50">
                  {/* Cupom */}
                  <div className="mb-4">
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <label htmlFor="cupom" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FiTag className="mr-1 text-[#ff69b4]" /> Cupom de desconto
                        </label>
                        <input
                          type="text"
                          id="cupom"
                          value={codigoCupom}
                          onChange={(e) => setCodigoCupom(e.target.value.toUpperCase())}
                          placeholder="SASKIA30"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-sm"
                        />
                      </div>
                      <button
                        onClick={aplicarCupom}
                        className="px-4 py-2 bg-pink-100 text-[#ff69b4] rounded-md hover:bg-pink-200 transition-colors mt-6 text-sm font-medium"
                      >
                        Aplicar
                      </button>
                    </div>
                    {erroCupom && (
                      <p className="mt-1 text-xs text-red-500">{erroCupom}</p>
                    )}
                    {descontoAplicado > 0 && (
                      <p className="mt-1 text-xs text-green-600">Desconto aplicado com sucesso!</p>
                    )}
                  </div>
                  
                  {/* Resumo */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-base text-gray-900">
                      <p>Subtotal</p>
                      <p>R$ {cartTotal.toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                    {descontoAplicado > 0 && (
                      <div className="flex justify-between text-base text-green-600">
                        <p>Desconto</p>
                        <p>-R$ {descontoAplicado.toFixed(2).replace('.', ',')}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <p>Total</p>
                      <p>R$ {totalComDesconto.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                  
                  {/* Botão de checkout */}
                  <button
                    onClick={finalizarCompra}
                    className="w-full bg-[#ff69b4] border border-transparent rounded-md py-3 px-4 font-medium text-white hover:bg-[#ff4dab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                  >
                    Finalizar Compra via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 