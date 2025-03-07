"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { maquiagemProducts, convertCategoryProductToProduct, Product } from '../data/categories';

/**
 * Componente de página para a categoria Maquiagem
 * 
 * Carrega os produtos de maquiagem e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Maquiagem() {
  const [produtosCategoria, setProdutosCategoria] = useState<Product[]>([]);
  
  useEffect(() => {
    // Converte produtos da categoria para o formato Product
    const produtosFormatados = maquiagemProducts
      .filter(produto => !produto.isViewAllSlide) // Remove slides "Ver Todos"
      .map(convertCategoryProductToProduct);
    
    setProdutosCategoria(produtosFormatados);
  }, []);

  return <CategoryPage categoryName="maquiagem" products={produtosCategoria} />;
}