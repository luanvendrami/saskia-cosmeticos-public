"use client";

import { perfumesProducts } from "@/data/categories";
import CategoryPage from "@/components/category-page";
import { useProducts } from "@/hooks/useProducts";

export default function Perfumes() {
  const { products: produtosCategoria, isLoading } =
    useProducts(perfumesProducts);

  return <CategoryPage categoryName="perfumes" products={produtosCategoria} />;
}
