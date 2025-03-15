/**
 * @fileoverview Types related to delivery functionality
 */

/**
 * Delivery information interface
 */
export interface DeliveryInfo {
  /**
   * Type of delivery - pickup or delivery
   */
  deliveryType: "pickup" | "delivery";

  /**
   * Address details - only required when deliveryType is "delivery"
   */
  address?: {
    /**
     * Street name (logradouro)
     */
    street: string;

    /**
     * Building or house number
     */
    number: string;

    /**
     * Neighborhood (bairro)
     */
    neighborhood: string;

    /**
     * City name (localidade)
     */
    city: string;

    /**
     * Postal code (CEP)
     */
    zipCode: string;

    /**
     * Additional address information
     */
    complement?: string;

    /**
     * Reference point near the address
     */
    reference?: string;

    /**
     * State abbreviation (UF)
     */
    state: string;
  };
}
