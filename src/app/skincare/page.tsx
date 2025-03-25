"use client";

import { skincareProducts } from "@/data/categories";
import CategoryPage from "@/components/category-page";
import { useProducts } from "@/hooks/useProducts";

export default function Skincare() {
  const { products: produtosCategoria, isLoading } =
    useProducts(skincareProducts);

  return <CategoryPage categoryName="skincare" products={produtosCategoria} />;
}
