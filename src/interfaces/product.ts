
export interface CategoryProduct {
  id: number; 
  imageUrl: string; 
  images?: string[]; 
  title: string; 
  price: string;
  description: string; 
  primeiroCarrossel: boolean; 
  category: string; 
  stockQuantity?: number; 
  topSell?: boolean; 
  isViewAllSlide?: boolean; 
  viewAllUrl?: string; 
  promocao: boolean; 
  descontoPromocao: number; 
  cupom: string; 
}


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  specifications?: {
    [key: string]: string;
  };
  relatedProducts?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  promocao?: boolean;
  descontoPromocao?: number;
  cupom?: string;
  topSell?: boolean;
}


export interface HeroProduct {
  id: number; 
  imageUrl: string; 
  title: string; 
  price: string; 
  description: string; 
  primeiroCarrossel: boolean; 
  isMobile: boolean;
  category?: string;
}


export interface CarouselItem {
  id: number;
  imageUrl: string;
  backupImageUrl?: string; 
  images?: string[]; 
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
  isMobile?: boolean; 
}
