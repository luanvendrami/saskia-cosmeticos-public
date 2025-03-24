/**
 * @fileoverview Cart-related interfaces for the application
 */

/**
 * Interface for a cart item
 */
export interface CartItem {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
}

/**
 * Interface for the cart context
 */
export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  cartTotal: number;
  cartCount: number;
}

/**
 * Interface for the cart item component props
 */
export interface CartItemProps {
  item: CartItem;
}
