"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { products, Product } from '../data/products';

export default function Skincare() {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products for this category
    const skincareProducts = products.filter(product => 
      product.category.toLowerCase() === 'skincare'
    );
    setCategoryProducts(skincareProducts);
  }, []);

  return <CategoryPage categoryName="skincare" products={categoryProducts} />;
}