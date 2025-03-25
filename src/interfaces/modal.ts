
export interface ProductModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  imageUrl: string; 
  images?: string[]; 
  title: string; 
  description: string; 
  price?: string;
  category?: string; 
  hideViewAll?: boolean; 
  onAddToCart?: (e: React.MouseEvent) => void; 
  stockQuantity?: number; 
  promocao?: boolean; 
  descontoPromocao?: number; 
  cupom?: string; 
}
