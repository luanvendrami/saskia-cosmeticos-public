"use client";

import CategoryPage from "../../components/CategoryPage";
import { cabelosProducts } from "../../data/categories";
import { useProducts } from "../../hooks/useProducts";

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
