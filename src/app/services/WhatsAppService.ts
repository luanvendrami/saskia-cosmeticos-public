/**
 * @fileoverview Service for WhatsApp-related functionality
 * This centralizes operations related to WhatsApp messaging
 * like stock notifications and checkout
 */

/**
 * Config object with WhatsApp settings
 */
export const WhatsAppConfig = {
  /**
   * Store's WhatsApp phone number in international format
   * Example: 5511999999999 for Brazilian number +55 11 99999-9999
   */
  storePhoneNumber: "5547997273738",
};

/**
 * Service class for WhatsApp-related operations
 */
export class WhatsAppService {
  /**
   * Creates a formatted message for out-of-stock product notification
   *
   * @param productTitle - Title of the product
   * @returns URL encoded message for WhatsApp
   */
  static formatStockNotificationMessage(productTitle: string): string {
    return encodeURIComponent(
      `Olá! Estou interessado(a) no produto *${productTitle}* que está esgotado no momento. ` +
        `Por favor, me avise quando estiver disponível novamente. Obrigado(a)!`
    );
  }

  /**
   * Opens WhatsApp with a notification message for an out-of-stock product
   *
   * @param productTitle - Title of the product
   */
  static sendStockNotification(productTitle: string): void {
    const message = this.formatStockNotificationMessage(productTitle);
    const whatsappUrl = `https://wa.me/${WhatsAppConfig.storePhoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }
}

export default WhatsAppService;
