"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { products, Product } from '../data/products';

export default function Maquiagem() {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products for this category
    const makeupProducts = products.filter(product => 
      product.category.toLowerCase() === 'maquiagem'
    );
    setCategoryProducts(makeupProducts);
  }, []);

  return <CategoryPage categoryName="maquiagem" products={categoryProducts} />;
}