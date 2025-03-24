"use client";

import CategoryPage from "@/app/components/category-page";
import { corpoProducts } from "@/app/data/categories";
import { useProducts } from "@/app/hooks/useProducts";

/**
 * Componente de página para a categoria Corpo
 *
 * Carrega os produtos para cuidados corporais e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Corpo() {
  const { products: produtosCategoria, isLoading } = useProducts(corpoProducts);

  return <CategoryPage categoryName="corpo" products={produtosCategoria} />;
}
