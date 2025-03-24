"use client";

import CategoryPage from "@/app/components/category-page";
import { cabelosProducts } from "@/app/data/categories";
import { useProducts } from "@/app/hooks/useProducts";

/**
 * Componente de página para a categoria Cabelos
 *
 * Carrega os produtos de cabelos e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Cabelos() {
  const { products: produtosCategoria, isLoading } =
    useProducts(cabelosProducts);

  return <CategoryPage categoryName="cabelos" products={produtosCategoria} />;
}
