/**
 * @fileoverview Category-related interfaces for the application
 */

import { Product } from "@/interfaces/product";

/**
 * Interface for CategoryPage component properties
 */
export interface CategoryPageProps {
  categoryName: string; // Name of the category (used for URLs and titles)
  products: Product[]; // List of products in the category
}
