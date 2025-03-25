
export const WhatsAppConfig = {

  storePhoneNumber: "",
};


export class WhatsAppService {

  static formatStockNotificationMessage(productTitle: string): string {
    return encodeURIComponent(
      `Olá! Estou interessado(a) no produto *${productTitle}* que está esgotado no momento. ` +
        `Por favor, me avise quando estiver disponível novamente. Obrigado(a)!`
    );
  }

  static sendStockNotification(productTitle: string): void {
    const message = this.formatStockNotificationMessage(productTitle);
    const whatsappUrl = `https://wa.me/${WhatsAppConfig.storePhoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }
}

export default WhatsAppService;
