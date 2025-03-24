import { MouseEvent } from "react";

/**
 * Interface that defines the properties for the ProductCard component
 */
export interface ProductCardProps {
  id: number; // Product unique identifier
  imageUrl: string; // URL of the product image
  images?: string[]; // Array of product image URLs for multiple images
  title: string; // Product title
  description: string; // Product description
  link?: string; // Optional navigation link
  price?: string; // Product price (ex: "R$ 99,90")
  category?: string; // Product category
  hideViewAll?: boolean; // Indicates if "View All" option should be hidden
  isViewAllSlide?: boolean; // Indicates if this card is a "View All" slide
  viewAllUrl?: string; // URL for the "View All" category page
  stockQuantity?: number; // Stock quantity
  promocao?: boolean; // Indicates if product is on promotion
  descontoPromocao?: number; // Promotion discount percentage
  cupom?: string; // Discount coupon code (ex: "PROMO10")
  onAddToCart?: (e: MouseEvent) => void; // Function to add to cart (optional)
  onOpenModal?: (e: MouseEvent) => void; // Function to open modal (optional)
}
