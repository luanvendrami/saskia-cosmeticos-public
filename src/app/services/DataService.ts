/**
 * @fileoverview Service for data-related operations
 * This centralizes operations for data conversion and transformation
 */

import { Product, CategoryProduct } from "../interfaces/product";

/**
 * Service class for data-related operations
 */
export class DataService {
  /**
   * Converts a product from CategoryProduct format to Product format
   * Used to ensure compatibility between different product formats
   *
   * @param categoryProduct - Product in category format
   * @returns Product converted to standard format
   */
  static convertCategoryProductToProduct(
    categoryProduct: CategoryProduct
  ): Product {
    return {
      id: categoryProduct.id,
      name: categoryProduct.title,
      price: parseFloat(
        categoryProduct.price.replace("R$ ", "").replace(",", ".")
      ),
      image: categoryProduct.imageUrl,
      images: categoryProduct.images,
      description: categoryProduct.description,
      category: categoryProduct.category,
      promocao: categoryProduct.promocao,
      stockQuantity: categoryProduct.stockQuantity,
      topSell: categoryProduct.topSell,
      descontoPromocao: categoryProduct.descontoPromocao,
      cupom: categoryProduct.cupom,
    };
  }

  /**
   * Filters and sorts products for category pages
   *
   * @param products - List of products to filter
   * @param searchTerm - Optional search term to filter by
   * @returns Filtered and sorted products
   */
  static filterAndSortProducts(
    products: Product[],
    searchTerm?: string
  ): Product[] {
    // First sort products by topSell, then by availability, then alphabetically
    const sortedProducts = [...products].sort((a, b) => {
      // Sort by topSell (featured products first)
      if (a.topSell && !b.topSell) return -1;
      if (!a.topSell && b.topSell) return 1;

      // Then sort by stock availability (in-stock products first)
      // Products without stockQuantity defined are considered in stock
      const aInStock = a.stockQuantity === undefined || a.stockQuantity > 0;
      const bInStock = b.stockQuantity === undefined || b.stockQuantity > 0;

      if (aInStock && !bInStock) return -1;
      if (!aInStock && bInStock) return 1;

      // Finally, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

    // Apply search filter if provided
    if (searchTerm && searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return sortedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return sortedProducts;
  }

  /**
   * Prepares category products for display by:
   * - Filtering out "View All" slides
   * - Converting to standard Product format
   *
   * @param categoryProducts - Products in category format
   * @returns Processed products ready for display
   */
  static prepareCategoryProducts(
    categoryProducts: CategoryProduct[]
  ): Product[] {
    return categoryProducts
      .filter((product) => !product.isViewAllSlide)
      .map(this.convertCategoryProductToProduct);
  }
}

export default DataService;
