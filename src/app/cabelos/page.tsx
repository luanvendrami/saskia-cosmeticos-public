"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { cabelosProducts } from '../data/categories';
import { Product } from '../interfaces/product';
import { DataService } from '../services';

/**
 * Componente de página para a categoria Cabelos
 * 
 * Carrega os produtos de cabelos e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Cabelos() {
  const [produtosCategoria, setProdutosCategoria] = useState<Product[]>([]);
  
  useEffect(() => {
    // Use DataService to prepare products
    const produtosFormatados = DataService.prepareCategoryProducts(cabelosProducts);
    setProdutosCategoria(produtosFormatados);
  }, []);

  return <CategoryPage categoryName="cabelos" products={produtosCategoria} />;
}