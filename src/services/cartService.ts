

import { CartItem } from "@/interfaces/cart";
import { DeliveryInfo } from "@/services/delivery";

import { WhatsAppConfig } from "./whatsAppService";


export class CartService {

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


    message += `\n${"─".repeat(30)}\n`;
    message += `*RESUMO FINANCEIRO:*\n`;
    message += `*Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}`;

  
    if (discount > 0) {
      message += `\n*Desconto:* R$ ${discount.toFixed(2).replace(".", ",")}`;
      message += `\n*Total:* R$ ${(subtotal - discount)
        .toFixed(2)
        .replace(".", ",")}`;
    } else {
      message += `\n*Total:* R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    }


    if (deliveryInfo) {
      message += `\n\n${"=".repeat(30)}\n\n`;

      message += `*MÉTODO DE ENTREGA:* ${
        deliveryInfo.deliveryType === "pickup"
          ? "Retirada no local"
          : "Entrega em domicílio"
      }`;


      if (deliveryInfo.deliveryType === "delivery" && deliveryInfo.address) {
        const address = deliveryInfo.address;

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

        message += `\n${"─".repeat(30)}`;
        message += `\n*Nota sobre frete:* O frete será calculado por um de nossos atendentes.`;
      } else if (deliveryInfo.deliveryType === "pickup") {
        message += `\n\n*Informação:* Seu pedido estará disponível para retirada em nossa loja física.`;
      }
    }

    message += `\n\n${"=".repeat(30)}\n\n`;

    message += `Por favor, confirme meu pedido. Agradeço desde já.`;

    return encodeURIComponent(message);
  }

  static checkoutViaWhatsApp(
    cartItems: CartItem[],
    subtotal: number,
    discount: number = 0,
    deliveryInfo?: DeliveryInfo
  ): void {
    if (cartItems.length === 0) return;

    const message = this.formatCartForWhatsApp(
      cartItems,
      subtotal,
      discount,
      deliveryInfo
    );

    const urlWhatsApp = `https://wa.me/${WhatsAppConfig.storePhoneNumber}?text=${message}`;
    window.open(urlWhatsApp, "_blank");
  }
}

export default CartService;
export type { DeliveryInfo };
