/**
 * @fileoverview Modal-related interfaces for the application
 */

/**
 * Interface for product modal component properties
 */
export interface ProductModalProps {
  isOpen: boolean; // Indicates if the modal is open
  onClose: () => void; // Function to close the modal
  imageUrl: string; // Product image URL
  images?: string[]; // Product image URLs array (for multiple images)
  title: string; // Product title
  description: string; // Product description
  price?: string; // Product price (optional)
  category?: string; // Product category (optional)
  hideViewAll?: boolean; // Indicates whether to hide the "View All" option (optional)
  onAddToCart?: (e: React.MouseEvent) => void; // Function to add to cart (optional)
  stockQuantity?: number; // Stock quantity (optional)
  promocao?: boolean; // Indicates if the product is on sale (optional)
  descontoPromocao?: number; // Discount percentage applied in the promotion (optional)
  cupom?: string; // Discount coupon code (optional)
}
