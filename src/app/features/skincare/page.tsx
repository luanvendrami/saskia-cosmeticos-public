"use client";

import CategoryPage from "../../components/CategoryPage";
import { skincareProducts } from "../../data/categories";
import { useProducts } from "../../hooks/useProducts";

/**
 * Componente de página para a categoria Skin Care
 *
 * Carrega os produtos de cuidados com a pele e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Skincare() {
  const { products: produtosCategoria, isLoading } =
    useProducts(skincareProducts);

  return <CategoryPage categoryName="skincare" products={produtosCategoria} />;
}
