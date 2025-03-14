/**
 * @fileoverview Definições e interfaces para os produtos das categorias
 * Este arquivo centraliza as exportações de todas as categorias de produtos
 * e fornece interfaces e funções utilitárias para manipulação dos dados
 */

// Importação de categorias - todas as importações no topo do arquivo para evitar erros
import { corpoProducts } from "./corpo";
import { heroProducts } from "./hero";
import type { HeroProduct } from "./hero";
import { maquiagemProducts } from "./maquiagem";
import { perfumesProducts } from "./perfumes";
import { skincareProducts } from "./skincare";
import { cabelosProducts } from "./cabelos";

/**
 * Interface para os produtos dentro de cada categoria
 * Utilizada nos arquivos específicos de cada categoria
 */
export interface CategoryProduct {
  id: number; // Identificador único do produto
  imageUrl: string; // URL da imagem do produto
  title: string; // Título/nome do produto
  price: string; // Preço em formato brasileiro (ex: "R$ 99,90")
  description: string; // Descrição detalhada do produto
  primeiroCarrossel: boolean; // Indica se o produto aparece no primeiro carrossel
  category: string; // Nome da categoria
  stockQuantity?: number; // Quantidade em estoque (opcional)
  topSell?: boolean; // Indica produtos destaques para exibir na página inicial
  isViewAllSlide?: boolean; // Indica se é o slide "Ver Todos" no final de um carrossel
  viewAllUrl?: string; // URL para a página "Ver Todos" da categoria
  promocao: boolean; // Indica se o produto está em promoção
  descontoPromocao: number; // Porcentagem de desconto aplicada na promoção
  cupom: string; // Código do cupom de desconto (ex: "PROMO10")
}

/**
 * Interface padrão para produtos
 * Compatível com a interface anterior do arquivo products.ts
 * Utilizada principalmente para manter compatibilidade com componentes existentes
 */
export interface Product {
  id: number; // Identificador único do produto
  name: string; // Nome do produto
  price: number; // Preço em formato numérico
  image: string; // URL da imagem do produto
  description: string; // Descrição detalhada do produto
  category: string; // Nome da categoria
  promocao: boolean; // Indica se o produto está em promoção
  benefits?: string; // Benefícios do produto (opcional)
  stockQuantity?: number; // Quantidade em estoque (opcional)
  topSell?: boolean; // Indica produtos destaques para página inicial (opcional)
  descontoPromocao: number; // Porcentagem de desconto aplicada na promoção
  cupom: string; // Código do cupom de desconto (ex: "PROMO10")
}

// Exportação de categorias
export { heroProducts };
export { cabelosProducts };
export { skincareProducts };
export { maquiagemProducts };
export { perfumesProducts };
export { corpoProducts };
export type { HeroProduct };

/**
 * Converte um produto do formato CategoryProduct para o formato Product
 * Utilizado para garantir compatibilidade entre os diferentes formatos
 *
 * @param categoryProduct - Produto no formato da categoria
 * @returns Produto convertido para o formato padrão
 */
export function convertCategoryProductToProduct(
  categoryProduct: CategoryProduct
): Product {
  return {
    id: categoryProduct.id,
    name: categoryProduct.title,
    price: parseFloat(
      categoryProduct.price.replace("R$ ", "").replace(",", ".")
    ),
    image: categoryProduct.imageUrl,
    description: categoryProduct.description,
    category: categoryProduct.category,
    promocao: categoryProduct.promocao,
    stockQuantity: categoryProduct.stockQuantity,
    topSell: categoryProduct.topSell,
    descontoPromocao: categoryProduct.descontoPromocao,
    cupom: categoryProduct.cupom,
  };
}

/**
 * Obtém todos os produtos de todas as categorias em um único array
 * Útil para pesquisas globais e outras operações que necessitam de todos os produtos
 *
 * @returns Array com todos os produtos de todas as categorias
 */
export function getAllProducts(): Product[] {
  const allCategoryProducts = [
    ...cabelosProducts,
    ...skincareProducts,
    ...maquiagemProducts,
    ...perfumesProducts,
    ...corpoProducts,
  ];

  return allCategoryProducts
    .filter((product) => !product.isViewAllSlide) // Remove slides "Ver Todos"
    .map(convertCategoryProductToProduct);
}
