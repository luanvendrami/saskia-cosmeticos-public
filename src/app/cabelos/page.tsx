"use client";

import { cabelosProducts } from "@/data/categories";
import CategoryPage from "@/components/category-page";
import { useProducts } from "@/hooks/useProducts";

export default function Cabelos() {
  const { products: produtosCategoria, isLoading } =
    useProducts(cabelosProducts);

  return <CategoryPage categoryName="cabelos" products={produtosCategoria} />;
}
