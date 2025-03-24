/**
 * @fileoverview Service for cart-related operations
 * This centralizes operations for the shopping cart like formatting checkout messages
 */

import { CartItem } from "@/interfaces/cart";
import { DeliveryInfo } from "@/services/delivery";

import { WhatsAppConfig } from "./whatsAppService";

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
   * @param deliveryInfo - Delivery information
   * @returns URL encoded message for WhatsApp
   */
  static formatCartForWhatsApp(
    cartItems: CartItem[],
    subtotal: number,
    discount: number = 0,
    deliveryInfo?: DeliveryInfo
  ): string {
    if (!cartItems.length) return "";

    let message = `*PEDIDO - SASKIA COSMÉTICOS*\n`;
    message += `${"─".repeat(30)}\n\n`;
    message += `*ITENS DO PEDIDO:*\n`;

    // Add each item to the message
    cartItems.forEach((item, index) => {
      const itemTotal = (
        parseFloat(item.price.replace("R$ ", "").replace(",", ".")) *
        item.quantity
      )
        .toFixed(2)
        .replace(".", ",");

      message += `${index + 1}. ${item.title} - ${item.quantity}x ${
        item.price
      } = R$ ${itemTotal}\n`;
    });

    // Add subtotal, discount, and total in a commercial format
    message += `\n${"─".repeat(30)}\n`;
    message += `*RESUMO FINANCEIRO:*\n`;
    message += `*Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}`;

    // Add discount if applied
    if (discount > 0) {
      message += `\n*Desconto:* R$ ${discount.toFixed(2).replace(".", ",")}`;
      message += `\n*Total:* R$ ${(subtotal - discount)
        .toFixed(2)
        .replace(".", ",")}`;
    } else {
      message += `\n*Total:* R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    }

    // Add delivery information if available
    if (deliveryInfo) {
      // Add a line break for better visual separation
      message += `\n\n${"=".repeat(30)}\n\n`;

      message += `*MÉTODO DE ENTREGA:* ${
        deliveryInfo.deliveryType === "pickup"
          ? "Retirada no local"
          : "Entrega em domicílio"
      }`;

      // Add address details if delivery type is "delivery"
      if (deliveryInfo.deliveryType === "delivery" && deliveryInfo.address) {
        const address = deliveryInfo.address;

        // Format delivery information in a more organized way
        message += `\n\n*DADOS PARA ENTREGA:*`;
        message += `\n${"─".repeat(30)}`;
        message += `\n*Endereço:* ${address.street}, ${address.number}`;
        message += `\n*Bairro:* ${address.neighborhood}`;
        message += `\n*Cidade:* ${address.city}`;
        message += `\n*CEP:* ${address.zipCode}`;

        if (address.complement && address.complement.trim() !== "") {
          message += `\n*Complemento:* ${address.complement}`;
        }

        if (address.reference && address.reference.trim() !== "") {
          message += `\n*Ponto de Referência:* ${address.reference}`;
        }

        // Add a note about shipping calculation
        message += `\n${"─".repeat(30)}`;
        message += `\n*Nota sobre frete:* O frete será calculado por um de nossos atendentes.`;
      } else if (deliveryInfo.deliveryType === "pickup") {
        message += `\n\n*Informação:* Seu pedido estará disponível para retirada em nossa loja física.`;
      }
    }

    // Add a final separator
    message += `\n\n${"=".repeat(30)}\n\n`;

    // Add message for order confirmation
    message += `Por favor, confirme meu pedido. Agradeço desde já.`;

    return encodeURIComponent(message);
  }

  /**
   * Initiates checkout by opening WhatsApp with order details
   *
   * @param cartItems - Array of cart items
   * @param subtotal - Cart subtotal
   * @param discount - Applied discount amount
   * @param deliveryInfo - Delivery information
   */
  static checkoutViaWhatsApp(
    cartItems: CartItem[],
    subtotal: number,
    discount: number = 0,
    deliveryInfo?: DeliveryInfo
  ): void {
    if (cartItems.length === 0) return;

    // Format cart items into a WhatsApp message
    const message = this.formatCartForWhatsApp(
      cartItems,
      subtotal,
      discount,
      deliveryInfo
    );

    // Create and open WhatsApp URL
    const urlWhatsApp = `https://wa.me/${WhatsAppConfig.storePhoneNumber}?text=${message}`;
    window.open(urlWhatsApp, "_blank");
  }
}

export default CartService;
export type { DeliveryInfo };
