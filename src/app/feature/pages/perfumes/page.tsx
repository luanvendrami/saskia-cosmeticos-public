"use client";

import CategoryPage from "@/app/components/category-page";
import { perfumesProducts } from "@/app/data/categories";
import { useProducts } from "@/app/hooks/useProducts";

/**
 * Componente de página para a categoria Perfumes
 *
 * Carrega os produtos de perfumes e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Perfumes() {
  const { products: produtosCategoria, isLoading } =
    useProducts(perfumesProducts);

  return <CategoryPage categoryName="perfumes" products={produtosCategoria} />;
}
