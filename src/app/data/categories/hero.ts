export interface HeroProduct {
  id: number;
  imageUrl: string; 
  title: string;
  price: string;
  description: string;
  primeiroCarrossel: boolean;
}

export const heroProducts: HeroProduct[] = [
  {
    id: 1,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Novidade 1",
    price: "",
    description: "Descrição da novidade 1",
    primeiroCarrossel: true,
  },
  {
    id: 2,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Novidade 2", 
    price: "",
    description: "Descrição da novidade 2",
    primeiroCarrossel: true,
  },
  {
    id: 3,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Novidade 3",
    price: "",
    description: "Descrição da novidade 3", 
    primeiroCarrossel: true,
  },
]; 