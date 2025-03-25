

import { Product, CategoryProduct } from "@/interfaces/product";


export class DataService {

  static convertCategoryProductToProduct(
    categoryProduct: CategoryProduct
  ): Product {
    return {
      id: categoryProduct.id.toString(),
      name: categoryProduct.title,
      price: parseFloat(
        categoryProduct.price.replace("R$ ", "").replace(",", ".")
      ),
      image: categoryProduct.imageUrl,
      images: categoryProduct.images,
      description: categoryProduct.description,
      category: categoryProduct.category,
      stock: categoryProduct.stockQuantity,
      discount: categoryProduct.descontoPromocao,
      promocao: categoryProduct.promocao,
      descontoPromocao: categoryProduct.descontoPromocao,
      cupom: categoryProduct.cupom,
      topSell: categoryProduct.topSell,
    };
  }


  static filterAndSortProducts(
    products: Product[],
    searchTerm?: string
  ): Product[] {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.topSell && !b.topSell) return -1;
      if (!a.topSell && b.topSell) return 1;

      const aInStock = a.stock === undefined || a.stock > 0;
      const bInStock = b.stock === undefined || b.stock > 0;

      if (aInStock && !bInStock) return -1;
      if (!aInStock && bInStock) return 1;

      return a.name.localeCompare(b.name);
    });

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

  
  static prepareCategoryProducts(
    categoryProducts: CategoryProduct[]
  ): Product[] {
    return categoryProducts
      .filter((product) => !product.isViewAllSlide)
      .map(this.convertCategoryProductToProduct);
  }
}

export default DataService;
