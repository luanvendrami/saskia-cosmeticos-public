
export interface CartItem {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
}


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


export interface CartItemProps {
  item: CartItem;
}
