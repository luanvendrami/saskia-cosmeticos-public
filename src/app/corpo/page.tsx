"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { corpoProducts, convertCategoryProductToProduct, Product } from '../data/categories';

/**
 * Componente de página para a categoria Corpo
 * 
 * Carrega os produtos para cuidados corporais e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Corpo() {
  const [produtosCategoria, setProdutosCategoria] = useState<Product[]>([]);
  
  useEffect(() => {
    // Converte produtos da categoria para o formato Product
    const produtosFormatados = corpoProducts
      .filter(produto => !produto.isViewAllSlide) // Remove slides "Ver Todos"
      .map(convertCategoryProductToProduct);
    
    setProdutosCategoria(produtosFormatados);
  }, []);

  return <CategoryPage categoryName="corpo" products={produtosCategoria} />;
}