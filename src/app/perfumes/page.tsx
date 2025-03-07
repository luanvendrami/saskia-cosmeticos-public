"use client";

import { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';
import { perfumesProducts, convertCategoryProductToProduct, Product } from '../data/categories';

/**
 * Componente de página para a categoria Perfumes
 * 
 * Carrega os produtos de perfumes e os prepara para exibição
 * utilizando o componente CategoryPage
 */
export default function Perfumes() {
  const [produtosCategoria, setProdutosCategoria] = useState<Product[]>([]);
  
  useEffect(() => {
    // Converte produtos da categoria para o formato Product
    const produtosFormatados = perfumesProducts
      .filter(produto => !produto.isViewAllSlide) // Remove slides "Ver Todos"
      .map(convertCategoryProductToProduct);
    
    setProdutosCategoria(produtosFormatados);
  }, []);

  return <CategoryPage categoryName="perfumes" products={produtosCategoria} />;
}