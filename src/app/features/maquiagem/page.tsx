"use client";

import CategoryPage from "../../components/CategoryPage";
import { maquiagemProducts } from "../../data/categories";
import { useProducts } from "../../hooks/useProducts";

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
