import { useState, useEffect } from "react";
import { Product, CategoryProduct } from "../interfaces/product";
import { DataService } from "../services";

/**
 * Custom hook for managing products from a specific category
 *
 * @param categoryProducts Array of category-specific products
 * @param shouldFilterViewAll Whether to filter out "view all" slides (handled internally by DataService)
 * @returns Object containing products state and loading state
 */
export const useProducts = (categoryProducts: CategoryProduct[]) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    try {
      // Process the products using DataService
      const formattedProducts =
        DataService.prepareCategoryProducts(categoryProducts);

      setProducts(formattedProducts);
    } catch (error) {
      // Remove console.error
    } finally {
      setIsLoading(false);
    }
  }, [categoryProducts]);

  return { products, isLoading };
};
