/**
 * @fileoverview ViaCEP API interfaces
 * This file contains interfaces related to the ViaCEP API integration
 */

/**
 * ViaCEP API Response
 * Contains address information returned by the ViaCEP API
 *
 * @see https://viacep.com.br/
 */
export interface ViaCepResponse {
  /**
   * CEP (postal code) in the format 00000-000
   */
  cep: string;

  /**
   * Street or public place name
   */
  logradouro: string;

  /**
   * Complement information (may be empty)
   */
  complemento: string;

  /**
   * Neighborhood name
   */
  bairro: string;

  /**
   * City name
   */
  localidade: string;

  /**
   * State abbreviation (UF - Unidade Federativa)
   */
  uf: string;

  /**
   * IBGE code for the city
   */
  ibge: string;

  /**
   * Area code (DDD - Discagem Direta à Distância)
   */
  ddd: string;

  /**
   * GIA code (specific for São Paulo state)
   */
  gia: string;

  /**
   * SIAFI code (used by the Brazilian government)
   */
  siafi: string;

  /**
   * Error flag (present only when an error occurs)
   */
  erro?: boolean;
}

/**
 * Error response from ViaCEP API
 */
export interface ViaCepError {
  erro: boolean;
}
