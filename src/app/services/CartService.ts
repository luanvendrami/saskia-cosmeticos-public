/**
 * @fileoverview Service for cart-related operations
 * This centralizes operations for the shopping cart like formatting checkout messages
 */

import { CartItem } from '../interfaces/cart';
import { WhatsAppConfig } from './WhatsAppService';

/**
 * Service class for cart-related operations
 */
export class CartService {
  /**
   * Formats cart items for WhatsApp checkout message
   * 
   * @param cartItems - Array of cart items
   * @param subtotal - Cart subtotal
   * @param discount - Applied discount amount
   * @returns URL encoded message for WhatsApp
   */
  static formatCartForWhatsApp(
    cartItems: CartItem[], 
    subtotal: number, 
    discount: number = 0
  ): string {
    if (!cartItems.length) return '';
    
    let message = `*Pedido da Loja Saskia Cosméticos*\n\n`;
    message += `*Itens do Pedido:*\n`;
    
    // Add each item to the message
    cartItems.forEach((item, index) => {
      const itemTotal = (parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity)
        .toFixed(2)
        .replace('.', ',');
      
      message += `${index + 1}. ${item.title} - ${item.quantity}x ${item.price} = R$ ${itemTotal}\n`;
    });
    
    // Add subtotal
    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    // Add discount if applied
    if (discount > 0) {
      message += `\n*Desconto:* R$ ${discount.toFixed(2).replace('.', ',')}`;
      message += `\n*Total:* R$ ${(subtotal - discount).toFixed(2).replace('.', ',')}`;
    }
    
    // Add message for order confirmation
    message += `\n\nPor favor, confirme meu pedido. Agradeço desde já!`;
    
    return encodeURIComponent(message);
  }

  /**
   * Initiates checkout by opening WhatsApp with order details
   * 
   * @param cartItems - Array of cart items
   * @param subtotal - Cart subtotal
   * @param discount - Applied discount amount
   */
  static checkoutViaWhatsApp(
    cartItems: CartItem[], 
    subtotal: number, 
    discount: number = 0
  ): void {
    if (cartItems.length === 0) return;
    
    // Format cart items into a WhatsApp message
    const message = this.formatCartForWhatsApp(cartItems, subtotal, discount);
    
    // Create and open WhatsApp URL
    const urlWhatsApp = `https://wa.me/${WhatsAppConfig.storePhoneNumber}?text=${message}`;
    window.open(urlWhatsApp, '_blank');
  }
}

export default CartService; 