"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { skincareProducts, convertCategoryProductToProduct, Product } from '../data/categories';

/**
 * Componente de página para a categoria Skin Care
 * 
 * Carrega os produtos de cuidados com a pele e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Skincare() {
  const [produtosCategoria, setProdutosCategoria] = useState<Product[]>([]);
  
  useEffect(() => {
    // Converte produtos da categoria para o formato Product
    const produtosFormatados = skincareProducts
      .filter(produto => !produto.isViewAllSlide) // Remove slides "Ver Todos"
      .map(convertCategoryProductToProduct);
    
    setProdutosCategoria(produtosFormatados);
  }, []);

  return <CategoryPage categoryName="skincare" products={produtosCategoria} />;
}