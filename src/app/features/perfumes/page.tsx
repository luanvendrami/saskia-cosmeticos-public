"use client";

import CategoryPage from "../../components/CategoryPage";
import { perfumesProducts } from "../../data/categories";
import { useProducts } from "../../hooks/useProducts";

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
