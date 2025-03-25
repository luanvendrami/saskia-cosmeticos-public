import { MouseEvent } from "react";

export interface ProductCardProps {
  id: number; 
  imageUrl: string; 
  images?: string[]; 
  title: string; 
  description: string; 
  link?: string; 
  price?: string; 
  category?: string; 
  hideViewAll?: boolean; 
  isViewAllSlide?: boolean; e
  viewAllUrl?: string; 
  stockQuantity?: number; 
  promocao?: boolean; 
  descontoPromocao?: number;e
  cupom?: string; 
  onAddToCart?: (e: MouseEvent) => void;
  onOpenModal?: (e: MouseEvent) => void; 
}
