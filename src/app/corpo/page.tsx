"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { products, Product } from '../data/products';

export default function Corpo() {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products for this category
    const bodyProducts = products.filter(product => 
      product.category.toLowerCase() === 'corpo'
    );
    setCategoryProducts(bodyProducts);
  }, []);

  return <CategoryPage categoryName="corpo" products={categoryProducts} />;
}