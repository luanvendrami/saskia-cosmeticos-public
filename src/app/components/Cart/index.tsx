"use client";

import { useRef, useEffect, useState } from 'react';
import { FiX, FiPlus, FiMinus, FiTrash, FiArrowRight, FiShoppingCart, FiCheck, FiTag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

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
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity,
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
   * Aplica um cupom de desconto ao carrinho
   */
  const aplicarCupom = () => {
    // Resetar estados de erro
    setErroCupom('');
    
    // Códigos de desconto
    const codigosDesconto: { [key: string]: number } = {
      'PROMO10': 10,
      'FRETE': 0 // Zero desconto, apenas frete grátis
    };
    
    const cupomNormalizado = codigoCupom.trim().toUpperCase();
    
    if (!codigosDesconto[cupomNormalizado]) {
      setErroCupom('Cupom inválido ou expirado.');
      return;
    }
    
    // Aplicar o cupom
    const percentualDesconto = codigosDesconto[cupomNormalizado];
    const valorDesconto = (cartTotal * percentualDesconto) / 100;
    
    if (percentualDesconto > 0) {
      setDescontoAplicado(valorDesconto);
      setErroCupom('');
      setCodigoCupom('');
    } else {
      // Para cupons como FRETE que não têm desconto percentual
      setErroCupom('Frete grátis aplicado!');
      setDescontoAplicado(0);
    }
  };

  /**
   * Remove o cupom de desconto aplicado
   */
  const removerCupom = () => {
    setDescontoAplicado(0);
    setCodigoCupom('');
    setErroCupom('');
  };

  /**
   * Formata o conteúdo do carrinho para mensagem do WhatsApp
   * 
   * @returns - Mensagem formatada para envio via WhatsApp
   */
  const formatarCarrinhoParaWhatsApp = () => {
    if (!cartItems.length) return '';
    
    let message = `*Pedido da Loja Saskia Cosméticos*\n\n`;
    message += `*Itens do Pedido:*\n`;
    
    // Add each item to the message
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ${item.quantity}x ${item.price} = R$ ${(parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    // Add subtotal
    message += `\n*Subtotal:* R$ ${cartTotal.toFixed(2).replace('.', ',')}`;
    
    // Add discount if applied
    if (descontoAplicado > 0) {
      message += `\n*Desconto:* R$ ${descontoAplicado.toFixed(2).replace('.', ',')}`;
      message += `\n*Total:* R$ ${(cartTotal - descontoAplicado).toFixed(2).replace('.', ',')}`;
    }
    
    // Add message for order confirmation
    message += `\n\nPor favor, confirme meu pedido. Agradeço desde já!`;
    
    return encodeURIComponent(message);
  };

  /**
   * Finaliza a compra abrindo o WhatsApp com o pedido
   */
  const finalizarCompra = () => {
    if (cartItems.length === 0) return;
    
    // WhatsApp phone number - should be the store's phone
    const numeroWhatsApp = "5511999999999"; // Example: Brazilian number format
    
    // Format cart items into a WhatsApp message
    const mensagem = formatarCarrinhoParaWhatsApp();
    
    // Create and open WhatsApp URL
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(urlWhatsApp, '_blank');
    
    // Optionally close cart after checkout initiated
    // toggleCart();
  };

  // Calcula o total após desconto
  const totalComDesconto = cartTotal - descontoAplicado;

  // Evita scroll na página quando o carrinho estiver aberto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Cart Toggle Button */}
      <button 
        onClick={toggleCart} 
        className="relative p-2 text-gray-800 hover:text-pink-500 transition-colors duration-200"
        aria-label="Abrir carrinho"
      >
        <FiShoppingCart className="w-6 h-6 text-[#ff69b4]" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div 
            ref={cartRef}
            className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col"
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiShoppingCart className="mr-2" />
                Seu Carrinho
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({cartCount} {cartCount === 1 ? 'item' : 'itens'})
                </span>
              </h2>
              <button 
                onClick={toggleCart}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Fechar carrinho"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FiShoppingCart className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Seu carrinho está vazio</p>
                  <p className="text-sm mt-2 text-center">Adicione alguns produtos ao seu carrinho e eles aparecerão aqui.</p>
                  <button 
                    onClick={toggleCart} 
                    className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                {/* Coupon Code Section */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FiTag className="mr-2 text-pink-500" />
                    <h3 className="text-md font-medium text-gray-700">Cupom de Desconto</h3>
                  </div>
                  
                  <div>
                    <div className="flex">
                      <input
                        type="text"
                        value={codigoCupom}
                        onChange={(e) => setCodigoCupom(e.target.value)}
                        placeholder="Digite seu cupom"
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-500"
                      />
                      <button
                        onClick={aplicarCupom}
                        className="px-4 py-2 bg-pink-500 text-white rounded-r-md hover:bg-pink-600 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                    {erroCupom && (
                      <p className="text-red-500 text-sm mt-1">{erroCupom}</p>
                    )}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      R$ {cartTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  {descontoAplicado > 0 && (
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span>Desconto:</span>
                      <span>-R$ {descontoAplicado.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-700">Total:</span>
                    <span className="text-xl font-bold text-pink-600">
                      R$ {totalComDesconto.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={finalizarCompra}
                  className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 