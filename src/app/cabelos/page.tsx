"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { products, Product } from '../data/products';

export default function Cabelos() {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products for this category
    const hairProducts = products.filter(product => 
      product.category.toLowerCase() === 'cabelos'
    );
    setCategoryProducts(hairProducts);
  }, []);

  return <CategoryPage categoryName="cabelos" products={categoryProducts} />;
}