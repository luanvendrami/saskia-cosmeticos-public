import { CategoryProduct } from './index';

export const skincareProducts: CategoryProduct[] = [
  {
    id: 201,
    imageUrl: "/images/MnZ8QWa.jpg",
    title: "Hidratante Facial 24h",
    price: "R$ 34,90",
    description: "Hidratante de rápida absorção para todos os tipos de pele.",
    primeiroCarrossel: false,
    category: "Skincare",
    stockQuantity: 15,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 202,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "SSSSérum Vitamina C",
    price: "R$ 79,90",
    description: "Sérum concentrado de vitamina C para uniformizar o tom da pele.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 7,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 203,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Limpador Facial",
    price: "R$ 49,90",
    description: "Sabonete líquido para limpeza diária sem ressecar a pele.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 18,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 204,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Tônico Facial",
    price: "R$ 45,90",
    description: "Tônico adstringente para equilibrar o pH da pele e fechar os poros.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 12,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 205,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Máscara Facial",
    price: "R$ 29,90",
    description: "Máscara de argila purificante para pele oleosa e com acne.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 9,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 206,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Protetor Solar Facial",
    price: "R$ 65,90",
    description: "Protetor solar FPS 50 com textura leve e acabamento matte.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 20,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 207,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Esfoliante Facial",
    price: "R$ 55,90",
    description: "Esfoliante suave para remover células mortas e desobstruir os poros.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 6,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 208,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Demaquilante",
    price: "R$ 39,90",
    description: "Demaquilante bifásico para remoção de maquiagem à prova d'água.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 15,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 209,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Água Micelar",
    price: "R$ 42,90",
    description: "Água micelar para limpeza facial e remoção de impurezas.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 15,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
  {
    id: 210,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Creme para Olheiras",
    price: "R$ 69,90",
    description: "Creme específico para a área dos olhos, reduz olheiras e bolsas.",
    primeiroCarrossel: false,
    category: "Skin Care",
    stockQuantity: 18,
    topSell: true,
    promocao: true,
    descontoPromocao: 10,
    cupom: "PROMO10"
  },
]; 

export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  primeiroCarrossel: boolean;
  category: string;
  stockQuantity?: number;
  topSell?: boolean;
  promocao: boolean;
  descontoPromocao: number;
  cupom: string;
} 