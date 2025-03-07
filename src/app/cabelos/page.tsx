"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { cabelosProducts, convertCategoryProductToProduct, Product } from '../data/categories';

/**
 * Componente de página para a categoria Cabelos
 * 
 * Carrega os produtos de cabelos e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Cabelos() {
  const [produtosCategoria, setProdutosCategoria] = useState<Product[]>([]);
  
  useEffect(() => {
    // Converte produtos da categoria para o formato Product
    const produtosFormatados = cabelosProducts
      .filter(produto => !produto.isViewAllSlide) // Remove slides "Ver Todos"
      .map(convertCategoryProductToProduct);
    
    setProdutosCategoria(produtosFormatados);
  }, []);

  return <CategoryPage categoryName="cabelos" products={produtosCategoria} />;
}