"use client";

import CategoryPage from "@/components/category-page";
import { maquiagemProducts } from "@/data/categories";
import { useProducts } from "@/hooks/useProducts";

export default function Maquiagem() {
  const { products: produtosCategoria, isLoading } =
    useProducts(maquiagemProducts);

  return <CategoryPage categoryName="maquiagem" products={produtosCategoria} />;
}
