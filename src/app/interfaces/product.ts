/**
 * @fileoverview Product-related interfaces for the application
 */

/**
 * Interface for products within each category
 * Used in category-specific files
 */
export interface CategoryProduct {
  id: number;              // Unique product identifier
  imageUrl: string;        // Product image URL
  title: string;           // Product title/name
  price: string;           // Price in Brazilian format (e.g., "R$ 99,90")
  description: string;     // Detailed product description
  primeiroCarrossel: boolean; // Indicates if the product appears in the first carousel
  category: string;        // Category name
  stockQuantity?: number;  // Stock quantity (optional)
  topSell?: boolean;       // Indicates featured products for display on the home page
  isViewAllSlide?: boolean; // Indicates if it's the "View All" slide at the end of a carousel
  viewAllUrl?: string;     // URL for the category's "View All" page
  promocao: boolean;       // Indicates if the product is on sale
  descontoPromocao: number; // Discount percentage applied in the promotion
  cupom: string;           // Discount coupon code (e.g., "PROMO10")
}

/**
 * Standard interface for products
 * Compatible with the previous interface from products.ts
 * Mainly used to maintain compatibility with existing components
 */
export interface Product {
  id: number;              // Unique product identifier
  name: string;            // Product name
  price: number;           // Price in numeric format
  image: string;           // Product image URL
  description: string;     // Detailed product description
  category: string;        // Category name
  promocao: boolean;       // Indicates if the product is on sale
  benefits?: string;       // Product benefits (optional)
  stockQuantity?: number;  // Stock quantity (optional)
  topSell?: boolean;       // Indicates featured products for home page (optional)
  descontoPromocao: number; // Discount percentage applied in the promotion
  cupom: string;           // Discount coupon code (e.g., "PROMO10")
}

/**
 * Interface for hero products displayed in the hero carousel
 */
export interface HeroProduct {
  id: number;              // Unique product identifier
  imageUrl: string;        // Product image URL
  title: string;           // Product title/name
  price: string;           // Price in string format
  description: string;     // Detailed product description
  primeiroCarrossel: boolean; // Indicates if the product appears in the first carousel
}

/**
 * Interface for carousel items used in the carousel component
 */
export interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  link?: string;
  primeiroCarrossel: boolean;
  category?: string;
  isViewAllSlide?: boolean;
  viewAllUrl?: string;
  stockQuantity?: number;
  promocao?: boolean;
  descontoPromocao?: number;
  cupom?: string;
}

/**
 * Interface for product card component properties
 */
export interface ProductCardProps {
  id: number;                // Unique product identifier
  imageUrl: string;          // Product image URL
  title: string;             // Product title
  description: string;       // Product description
  link?: string;             // Optional navigation link
  price?: string;            // Product price in string format (e.g., "R$ 99,90")
  category?: string;         // Product category
  hideViewAll?: boolean;     // Indicates whether to hide the "View All" option
  isViewAllSlide?: boolean;  // Indicates if this card is a "View All" slide
  viewAllUrl?: string;       // URL for the category's "View All" page
  stockQuantity?: number;    // Stock quantity
  promocao?: boolean;        // Indicates if the product is on sale
  descontoPromocao?: number; // Discount percentage applied in the promotion
  cupom?: string;            // Discount coupon code (e.g., "PROMO10")
} 