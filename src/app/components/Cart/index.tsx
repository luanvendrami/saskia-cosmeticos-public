"use client";

import { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import { FiShoppingCart, FiX } from 'react-icons/fi';

export default function Cart() {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    cartTotal, 
    cartCount 
  } = useCart();
  
  const cartRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close cart
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  // Prevent body scroll when cart is open
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

  // Format cart items for WhatsApp message
  const formatCartForWhatsApp = () => {
    // Phone number - change this to the store's WhatsApp number
    const phoneNumber = "5547996605059"; // Example: 55 (country code) + 11 (area code) + phone number
    
    // Create a header for the message
    let message = "🛒 *Novo Pedido - Saskia Cosméticos* 🛒\n\n";
    message += "*Itens do Pedido:*\n";
    
    // Add each cart item to the message
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n`;
      message += `   - Quantidade: ${item.quantity}\n`;
      message += `   - Preço unitário: ${item.price}\n`;
      
      // Calculate and format the item subtotal
      const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
      const subtotal = price * item.quantity;
      message += `   - Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n\n`;
    });
    
    // Add the cart total
    message += `*Total do Pedido: R$ ${cartTotal.toFixed(2).replace('.', ',')}*\n\n`;
    
    // Add a note asking for customer information
    message += "Por favor, confirme as informações acima e forneça:\n";
    message += "- Nome completo\n";
    message += "- Endereço de entrega\n";
    message += "- Forma de pagamento preferida\n\n";
    message += "Obrigado por escolher a Saskia Cosméticos! 💖";
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create the WhatsApp URL
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const whatsappUrl = formatCartForWhatsApp();
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Optionally close the cart after checkout
    toggleCart();
  };

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
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-700">Total:</span>
                  <span className="text-xl font-bold text-pink-600">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
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