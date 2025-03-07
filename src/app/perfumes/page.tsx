"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { products, Product } from '../data/products';

export default function Perfumes() {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products for this category
    const perfumeProducts = products.filter(product => 
      product.category.toLowerCase() === 'perfumes'
    );
    setCategoryProducts(perfumeProducts);
  }, []);

  return <CategoryPage categoryName="perfumes" products={categoryProducts} />;
}