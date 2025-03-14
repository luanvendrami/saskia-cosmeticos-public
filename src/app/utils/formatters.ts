/**
 * Utility functions for formatting data
 */

/**
 * Formats a price in cents to a displayable BRL currency string
 * @param priceInCents Price in cents
 * @returns Formatted price string
 */
export const formatCurrency = (priceInCents: number): string => {
  const priceInReais = priceInCents / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInReais);
};

/**
 * Formats a product name to be used in URLs
 * @param name Product name
 * @returns URL-friendly product name
 */
export const formatProductNameForUrl = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

/**
 * Truncates a text to a specified maximum length
 * @param text The text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
