"use client";

import Image from 'next/image';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart, CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { id, imageUrl, title, price, quantity } = item;

  // Parse price from string (R$ XX,XX) to number
  const getNumericPrice = (priceString: string) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace('R$ ', '').replace(',', '.'));
  };

  const numericPrice = getNumericPrice(price);
  const totalPrice = numericPrice * quantity;

  return (
    <li className="py-4">
      <div className="flex items-start space-x-3">
        {/* Product Image */}
        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-medium text-gray-800 truncate">{title}</h4>
          <p className="mt-1 text-sm text-gray-500">R$ {numericPrice.toFixed(2).replace('.', ',')}</p>
          
          {/* Quantity Controls */}
          <div className="mt-2 flex items-center">
            <button
              onClick={() => decreaseQuantity(id)}
              disabled={quantity <= 1}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Diminuir quantidade"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            
            <span className="mx-2 w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            
            <button
              onClick={() => increaseQuantity(id)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Aumentar quantidade"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Price and Remove Button */}
        <div className="flex flex-col items-end">
          <span className="text-base font-medium text-gray-900">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </span>
          
          <button
            onClick={() => removeFromCart(id)}
            className="mt-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remover item"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
} 