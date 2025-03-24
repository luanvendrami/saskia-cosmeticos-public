"use client";

import CategoryPage from "@/app/components/CategoryPage";
import { maquiagemProducts } from "@/app/data/categories";
import { useProducts } from "@/app/hooks/useProducts";

/**
 * Componente de página para a categoria Maquiagem
 *
 * Carrega os produtos de maquiagem e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Maquiagem() {
  const { products: produtosCategoria, isLoading } =
    useProducts(maquiagemProducts);

  return <CategoryPage categoryName="maquiagem" products={produtosCategoria} />;
}
