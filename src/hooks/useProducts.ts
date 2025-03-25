import { useState, useEffect } from "react";

import { Product, CategoryProduct } from "@/interfaces/product";
import { DataService } from "@/services";

export const useProducts = (categoryProducts: CategoryProduct[]) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    try {
      const formattedProducts =
        DataService.prepareCategoryProducts(categoryProducts);
      setProducts(formattedProducts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [categoryProducts]);

  return { products, isLoading };
};
