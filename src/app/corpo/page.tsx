"use client";

import CategoryPage from "@/components/category-page";
import { corpoProducts } from "@/data/categories";
import { useProducts } from "@/hooks/useProducts";

export default function Corpo() {
  const { products: produtosCategoria, isLoading } = useProducts(corpoProducts);

  return <CategoryPage categoryName="corpo" products={produtosCategoria} />;
}
