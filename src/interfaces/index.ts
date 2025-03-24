/**
 * @fileoverview Central export file for all application interfaces
 * This file makes it easier to import interfaces from a single source
 */

// Re-export all interfaces from the product file
export type {
  CategoryProduct,
  Product,
  HeroProduct,
  CarouselItem,
} from "./product";

// Re-export all interfaces from the cart file
export type { CartItem, CartContextType, CartItemProps } from "./cart";

// Re-export all interfaces from the toast file
export type {
  ToastType,
  ToastMessage,
  ToastContextProps,
  ToastProps,
} from "./toast";

// Re-export all interfaces from the carousel file
export type {
  SwiperBreakpoints,
  CarouselProps,
  CarouselImagesProps,
} from "./carousel";

// Re-export all interfaces from the category file
export type { CategoryPageProps } from "./category";

// Re-export all interfaces from the modal file
export type { ProductModalProps } from "./modal";

// ProductCard interfaces - only export from productCard.ts
export type { ProductCardProps } from "./productCard";
