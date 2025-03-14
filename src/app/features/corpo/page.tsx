"use client";

import CategoryPage from "../../components/CategoryPage";
import { corpoProducts } from "../../data/categories";
import { useProducts } from "../../hooks/useProducts";

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
