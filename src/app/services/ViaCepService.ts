/**
 * @fileoverview ViaCEP API service
 * This service handles requests to the ViaCEP API for address information lookup
 */

import { ViaCepResponse } from "../interfaces/viacep";

/**
 * ViaCepService
 *
 * Service for fetching address information from the ViaCEP API
 */
export class ViaCepService {
  /**
   * Base URL for the ViaCEP API
   */
  private static baseUrl = "https://viacep.com.br/ws";

  /**
   * Fetches address information for the given CEP (postal code)
   *
   * @param cep - The CEP (postal code) to look up (numbers only)
   * @returns Promise with address information or null if not found
   */
  public static async getAddressByCep(
    cep: string
  ): Promise<ViaCepResponse | null> {
    try {
      // Format the CEP by removing non-digit characters
      const formattedCep = cep.replace(/\D/g, "");

      // Validate CEP format (must be 8 digits)
      if (formattedCep.length !== 8) {
        return null;
      }

      // Make the API request
      const response = await fetch(`${this.baseUrl}/${formattedCep}/json/`);

      // Parse the response
      const data: ViaCepResponse = await response.json();

      // Check if the API returned an error
      if (data.erro) {
        return null;
      }

      return data;
    } catch (error) {
      throw new Error("Não foi possível obter os dados do CEP.");
    }
  }

  /**
   * Formats a CEP string by adding the dash (e.g., "12345678" -> "12345-678")
   *
   * @param cep - The CEP string to format (digits only)
   * @returns Formatted CEP string
   */
  public static formatCep(cep: string): string {
    const digits = cep.replace(/\D/g, "");

    if (digits.length === 8) {
      return `${digits.substring(0, 5)}-${digits.substring(5)}`;
    }

    return cep;
  }

  /**
   * Sanitizes a CEP string by removing non-digit characters
   *
   * @param cep - The CEP string to sanitize
   * @returns CEP with only digits
   */
  public static sanitizeCep(cep: string): string {
    return cep.replace(/\D/g, "");
  }
}
