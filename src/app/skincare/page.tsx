"use client";

import { skincareProducts } from "@/data/categories";
import CategoryPage from "@/components/category-page";
import { useProducts } from "@/hooks/useProducts";

/**
 * Componente de página para a categoria Skin Care
 *
 * Carrega os produtos de skin care e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Skincare() {
  const { products: produtosCategoria, isLoading } =
    useProducts(skincareProducts);

  return <CategoryPage categoryName="skincare" products={produtosCategoria} />;
}
